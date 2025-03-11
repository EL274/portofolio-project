const Expense = require('../models/Expense');

//  Récupérer toutes les dépenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Ajouter une dépense
exports.addExpense = async (req, res) => {
  try {
    const { amount, category } = req.body;
    if (!amount || !category) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const newExpense = new Expense({ amount, category });
    await newExpense.save();
    
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
