const mongoose = require('mongoose');

const CategoryBudgetSchema = new mongoose.Schema({
    category: {
        type: String, required: true },
        amount: {
            type: Number, required: true},
        }, {_id: false
});

const BudgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalBudget: { type: Number, required: true, min: 0},
    categoryBudgets: { type: [CategoryBudgetSchema], default: [] },
},{timestamps: true });

module.exports = mongoose.model('Budget', BudgetSchema);
