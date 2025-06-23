const Transaction = require('../models/Transaction'); // Assurez-vous d'avoir un modèle Transaction

// Créer une transaction
exports.createTransaction = async (req, res) => {
  try {
    const { category, amount, type, date } = req.body;
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté

    const newTransaction = new Transaction({
      user: userId,
      category,
      amount,
      type,
      date,
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction créée avec succès", transaction: newTransaction });
  } catch (error) {
    console.error("Erreur lors de la création de la transaction :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Récupérer toutes les transactions de l'utilisateur
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté
    const transactions = await Transaction.find({ user: userId });
    console.log("Transactions récupérées :", transactions);
    
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Mettre à jour une transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, type, date } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { category, amount, type, date },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }

    res.status(200).json({ message: "Transaction mise à jour avec succès", transaction: updatedTransaction });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la transaction :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Supprimer une transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }

    res.status(200).json({ message: "Transaction supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la transaction :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
