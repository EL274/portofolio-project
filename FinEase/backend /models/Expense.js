const mongoose = require('mongoose');

const depenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', depenseSchema);
