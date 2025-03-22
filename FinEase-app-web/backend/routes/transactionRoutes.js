const express = require('express');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Récupérer toutes les transactions
router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});

// Ajouter une transaction
router.post('/', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json(transaction);
});

router.get('/', authMiddleware, async (req, res) => {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
});

router.post('/', authMiddleware, async (req, res) => {
    const transaction = new Transaction({ ...req.body, userId: req.user.id });
    await transaction.save();
    res.json(transaction);
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la mise à jour" });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: "Transaction supprimée" });
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la suppression" });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const transactions = await Transaction.find({ userId: req.user.id })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ date: -1 });

    const count = await Transaction.countDocuments({ userId: req.user.id });
    res.json({
        transactions,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
});


module.exports = router;
