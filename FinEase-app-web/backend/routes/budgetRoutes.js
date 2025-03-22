const express = require('express');
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction'); // Ajout pour récupérer les transactions
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');
const { sendBudgetAlertEmail } = require('../services/emailService'); // Ajout pour l'envoi d'email

const router = express.Router();

/**
 *  Récupérer le budget d'un utilisateur
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        const budget = await Budget.findOne({ userId: req.user.id });
        if (!budget) return res.status(404).json({ error: "Aucun budget trouvé" });

        res.json(budget);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

/**
 *  Mettre à jour le budget global et gérer les alertes
 */
router.put('/', authMiddleware, async (req, res) => {
    try {
        const { totalBudget, categoryBudgets } = req.body;

        let budget = await Budget.findOne({ userId: req.user.id });
        if (!budget) {
            budget = new Budget({ userId: req.user.id, totalBudget, categoryBudgets });
        } else {
            budget.totalBudget = totalBudget;
            budget.categoryBudgets = categoryBudgets;
        }

        await budget.save();
        await checkBudgetExceeded(req.user.id, req.user.email); // Vérification du dépassement après mise à jour

        res.json({ message: "Budget mis à jour", budget });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur lors de la mise à jour du budget" });
    }
});

/**
 *  Vérification si l'utilisateur dépasse son budget
 */
const checkBudgetExceeded = async (userId, email) => {
    try {
        const transactions = await Transaction.find({ userId });
        const totalDepenses = transactions
            .filter(t => t.type === 'dépense')
            .reduce((acc, t) => acc + t.amount, 0);

        const budget = await Budget.findOne({ userId });

        if (budget && totalDepenses > budget.totalBudget) {
            //  Ajout d'une notification en base de données
            await new Notification({
                userId,
                message: `⚠️ Vous avez dépassé votre budget mensuel !`
            }).save();

            //  Envoi d'un email d'alerte
            await sendBudgetAlertEmail(email, `Vous avez dépassé votre budget de ${totalDepenses - budget.totalBudget} € !`);
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du dépassement de budget :", error);
    }
};

module.exports = router;
