const Budget = require('../models/Budget'); // Assurez-vous d'avoir un modèle Budget

// Créer un budget
exports.createBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté

    const newBudget = new Budget({
      user: userId,
      category,
      amount,
    });

    await newBudget.save();
    res.status(201).json({ message: "Budget créé avec succès", budget: newBudget });
  } catch (error) {
    console.error("Erreur lors de la création du budget :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Récupérer tous les budgets de l'utilisateur
exports.getBudgets = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté
    const budgets = await Budget.find({ user: userId });
    res.status(200).json(budgets);
  } catch (error) {
    console.error("Erreur lors de la récupération des budgets :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Mettre à jour un budget
exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount } = req.body;

    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { category, amount },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget non trouvé" });
    }

    res.status(200).json({ message: "Budget mis à jour avec succès", budget: updatedBudget });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du budget :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Supprimer un budget
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBudget = await Budget.findByIdAndDelete(id);

    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget non trouvé" });
    }

    res.status(200).json({ message: "Budget supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du budget :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
