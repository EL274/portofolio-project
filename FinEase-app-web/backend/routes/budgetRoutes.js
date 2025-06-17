const express = require('express');
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');
const { sendBudgetAlertEmail } = require('../services/emailService');
const { budgetSchema, budgetUpdateSchema } = require('../validations/budgetValidation');
const logger = require('../config/logger');

const router = express.Router();

/**
 * Récupérer le budget avec analyse des dépenses
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        const budget = await Budget.findOne({ userId: req.user.id });
        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Aucun budget trouvé"
            });
        }

        // Récupérer les transactions du mois en cours
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const transactions = await Transaction.find({
            userId: req.user.id,
            date: { $gte: firstDayOfMonth, $lte: now }
        });

        // Calculer les dépenses par catégorie
        const categoryAnalysis = budget.categoryBudgets.map(category => {
            const categorySpending = transactions
                .filter(t => t.type === 'dépense' && t.category === category.category)
                .reduce((acc, t) => acc + t.amount, 0);

            return {
                category: category.category,
                budgeted: category.amount,
                spent: categorySpending,
                remaining: category.amount - categorySpending,
                percentageUsed: Math.min(100, (categorySpending / category.amount) * 100)
            };
        });

        // Calcul du total des dépenses
        const totalSpent = transactions
            .filter(t => t.type === 'dépense')
            .reduce((acc, t) => acc + t.amount, 0);

        res.json({
            success: true,
            data: {
                budget,
                analysis: {
                    totalBudget: budget.totalBudget,
                    totalSpent,
                    remaining: budget.totalBudget - totalSpent,
                    categories: categoryAnalysis,
                    lastUpdated: budget.updatedAt
                }
            }
        });

    } catch (error) {
        logger.error('Erreur récupération budget:', error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        });
    }
});

/**
 * Créer ou mettre à jour le budget
 */
router.put('/', authMiddleware, async (req, res) => {
    try {
        // Validation des données
        const { error } = budgetSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { totalBudget, categoryBudgets } = req.body;

        // Vérification des montants positifs
        if (totalBudget <= 0 || categoryBudgets.some(c => c.amount <= 0)) {
            return res.status(400).json({
                success: false,
                message: "Les montants doivent être positifs"
            });
        }

        let budget = await Budget.findOne({ userId: req.user.id });

        if (!budget) {
            budget = new Budget({
                userId: req.user.id,
                totalBudget,
                categoryBudgets
            });
        } else {
            budget.totalBudget = totalBudget;
            budget.categoryBudgets = categoryBudgets;
        }

        await budget.save();
        await checkBudgetExceeded(req.user.id, req.user.email);

        res.json({
            success: true,
            message: "Budget mis à jour avec succès",
            data: budget
        });

    } catch (error) {
        logger.error('Erreur mise à jour budget:', error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur lors de la mise à jour du budget"
        });
    }
});

/**
 * Mettre à jour une catégorie spécifique
 */
router.put('/category', authMiddleware, async (req, res) => {
    try {
        // Validation
        const { error } = budgetUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { category, amount } = req.body;
        const userId = req.user.id;

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Le montant doit être positif"
            });
        }

        let budget = await Budget.findOne({ userId });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget non trouvé"
            });
        }

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
        await checkBudgetExceeded(userId, req.user.email);

        res.json({
            success: true,
            message: "Catégorie mise à jour avec succès",
            data: budget
        });

    } catch (error) {
        logger.error('Erreur mise à jour catégorie:', error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        });
    }
});

/**
 * Vérification des dépassements de budget
 */
async function checkBudgetExceeded(userId, email) {
    try {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const transactions = await Transaction.find({
            userId,
            date: { $gte: firstDayOfMonth, $lte: now },
            type: 'dépense'
        });

        const budget = await Budget.findOne({ userId });
        if (!budget) return;

        // Vérification globale
        const totalSpent = transactions.reduce((acc, t) => acc + t.amount, 0);
        if (totalSpent > budget.totalBudget) {
            const exceededAmount = totalSpent - budget.totalBudget;
            
            await Notification.create({
                userId,
                type: 'budget_exceeded',
                message: `⚠️ Vous avez dépassé votre budget mensuel de ${exceededAmount} € !`,
                metadata: { exceededAmount }
            });

            await sendBudgetAlertEmail(
                email,
                'Alerte de dépassement de budget',
                `Vous avez dépassé votre budget mensuel de ${exceededAmount} € !`
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
                    type: 'category_exceeded',
                    message: ` Vous avez dépassé le budget ${category.category} de ${categorySpending - category.amount} € !`,
                    metadata: {
                        category: category.category,
                        exceededAmount: categorySpending - category.amount
                    }
                });
            }
        }
    } catch (error) {
        logger.error('Erreur vérification dépassement:', error);
    }
}

module.exports = router;
