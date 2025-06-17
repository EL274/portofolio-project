const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const Notification = require('../models/Notification');
const { sendBudgetAlertEmail } = require('../services/emailService');
const logger = require('../config/logger');
const { budgetSchema, budgetUpdateSchema } = require('../validations/budgetValidation');

// Middleware de vérification de propriété
const checkBudgetOwnership = async (req, res, next) => {
  try {
    const budget = await Budget.findOne({ _id: req.params.id, user: req.user.id });
    if (!budget) {
      return res.status(404).json({ 
        success: false,
        message: "Budget non trouvé ou non autorisé" 
      });
    }
    req.budget = budget;
    next();
  } catch (error) {
    logger.error('Erreur vérification propriété budget', error);
    res.status(500).json({ 
      success: false,
      message: "Erreur de vérification d'autorisation" 
    });
  }
};

// Créer ou mettre à jour le budget (version unifiée)
exports.setOrUpdateBudget = async (req, res) => {
  try {
    // Validation des données
    const { error } = budgetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { totalBudget, salary, categoryBudgets } = req.body;
    const userId = req.user.id;

    // Vérification des montants positifs
    if (totalBudget <= 0 || salary <= 0) {
      return res.status(400).json({
        success: false,
        message: "Les montants doivent être positifs"
      });
    }

    let budget = await Budget.findOne({ user: userId });

    if (!budget) {
      budget = new Budget({ 
        user: userId, 
        totalBudget, 
        salary, 
        categoryBudgets 
      });
    } else {
      budget.totalBudget = totalBudget;
      budget.salary = salary;
      budget.categoryBudgets = categoryBudgets;
    }

    await budget.save();
    await checkBudgetExceeded(userId, req.user.email);

    res.status(200).json({ 
      success: true,
      message: "Budget enregistré avec succès", 
      data: budget 
    });
  } catch (error) {
    logger.error("Erreur lors de la mise à jour du budget :", error);
    res.status(500).json({ 
      success: false,
      message: "Erreur serveur lors de la gestion du budget" 
    });
  }
};

// Récupérer le budget de l'utilisateur avec analyse
exports.getUserBudgetWithAnalysis = async (req, res) => {
  try {
    const userId = req.user.id;
    const budget = await Budget.findOne({ user: userId });

    if (!budget) {
      return res.status(404).json({ 
        success: false,
        message: "Aucun budget trouvé pour cet utilisateur" 
      });
    }

    // Récupérer les transactions pour analyse
    const transactions = await Transaction.find({ 
      userId,
      date: { 
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
      }
    });

    // Analyse par catégorie
    const categoryAnalysis = budget.categoryBudgets.map(category => {
      const categorySpending = transactions
        .filter(t => t.type === 'dépense' && t.category === category.category)
        .reduce((acc, t) => acc + t.amount, 0);

      return {
        category: category.category,
        budgeted: category.amount,
        spent: categorySpending,
        remaining: category.amount - categorySpending,
        percentage: (categorySpending / category.amount) * 100
      };
    });

    res.status(200).json({
      success: true,
      data: {
        budget,
        analysis: {
          categories: categoryAnalysis,
          lastUpdated: budget.updatedAt
        }
      }
    });
  } catch (error) {
    logger.error("Erreur lors de la récupération du budget :", error);
    res.status(500).json({ 
      success: false,
      message: "Erreur serveur lors de la récupération du budget" 
    });
  }
};

// Mettre à jour une catégorie spécifique
exports.updateBudgetCategory = [
  checkBudgetOwnership,
  async (req, res) => {
    try {
      const { error } = budgetUpdateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message
        });
      }

      const { category, amount } = req.body;
      const budget = req.budget;

      // Mise à jour de la catégorie
      const categoryIndex = budget.categoryBudgets.findIndex(
        cb => cb.category === category
      );

      if (categoryIndex === -1) {
        budget.categoryBudgets.push({ category, amount });
      } else {
        budget.categoryBudgets[categoryIndex].amount = amount;
      }

      await budget.save();
      await checkBudgetExceeded(budget.user, req.user.email);

      res.status(200).json({
        success: true,
        message: "Catégorie mise à jour avec succès",
        data: budget
      });
    } catch (error) {
      logger.error("Erreur mise à jour catégorie budget :", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la mise à jour de la catégorie"
      });
    }
  }
];

// Vérification améliorée du dépassement de budget
const checkBudgetExceeded = async (userId, email) => {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const transactions = await Transaction.find({ 
      userId,
      date: { $gte: firstDayOfMonth, $lte: now },
      type: 'dépense'
    });

    const budget = await Budget.findOne({ user: userId });
    if (!budget) return;

    // Vérification du budget total
    const totalDepenses = transactions.reduce((acc, t) => acc + t.amount, 0);
    if (totalDepenses > budget.totalBudget) {
      await Notification.create({
        userId,
        type: 'budget_exceeded',
        message: `⚠️ Vous avez dépassé votre budget mensuel de ${totalDepenses - budget.totalBudget} € !`,
        metadata: {
          exceededAmount: totalDepenses - budget.totalBudget
        }
      });

      await sendBudgetAlertEmail(
        email, 
        'Alerte de dépassement de budget',
        `Vous avez dépassé votre budget mensuel de ${totalDepenses - budget.totalBudget} € !`
      );
    }

    // Vérification par catégorie
    for (const category of budget.categoryBudgets) {
      const categorySpending = transactions
        .filter(t => t.category === category.category)
        .reduce((acc, t) => acc + t.amount, 0);

      if (categorySpending > category.amount) {
        await Notification.create({
          userId,
          type: 'category_budget_exceeded',
          message: `Vous avez dépassé votre budget pour ${category.category} de ${categorySpending - category.amount} € !`,
          metadata: {
            category: category.category,
            exceededAmount: categorySpending - category.amount
          }
        });
      }
    }
  } catch (error) {
    logger.error("Erreur vérification dépassement budget :", error);
  }
};
