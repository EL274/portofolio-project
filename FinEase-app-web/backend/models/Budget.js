const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalBudget: { type: Number, required: true },
    categoryBudgets: { type: Object, default: {} }
});

module.exports = mongoose.model('Budget', BudgetSchema);
