const express = require('express');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Récupérer les transactions paginées
router.get('/', authMiddleware, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const transactions = await Transaction.find({ userId: req.user.id })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ date: -1 });

        const count = await Transaction.countDocuments({ userId: req.user.id });

        res.json({
            success: true,
            transactions,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Ajouter une transaction
router.post('/', authMiddleware, async (req, res) => {
    try {
        const transaction = new Transaction({ ...req.body, userId: req.user.id });
        await transaction.save();
        res.json({ success: true, transaction });
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur d'ajout" });
    }
});

// Modifier une transaction
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        res.json({ success: true, transaction: updatedTransaction });
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur de mise à jour" });
    }
});

// Supprimer une transaction
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ success: true, message: "Transaction supprimée" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Erreur de suppression" });
    }
});

module.exports = router;
