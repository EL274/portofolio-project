const Depense = require('../models/Depense');

exports.ajourterDepense = async (req, res) => {
    const { montant, categorie, user_id } = req.body;
    try {
       const nouvelleDepense = new Depense ({ montant, categorie, user_id });
       await nouvelleDepense.save();
       res.status(201).json(nouvelleDepense);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

exports.obtenirDepenses = async (req, res) => {
    try {
        const depense = await Depense.find({ user_id: req.params.user_id});
        res.json(depenses);
    } catch (err) {
        req.status(500).json({ message: err.message });
    }
};
