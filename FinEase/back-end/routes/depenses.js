const express = require('express');
const Depense = require ('../models/Depense');
const router = express.Router();

router.post('/', async (req, res) => {
    const { montant, categorie, user_id } = req.body;
    try {
        const nouvelleDepense = new Depense({ montant, categorie, user_id });
        await nouvelleDepense.save();
        res.status(201).json(nouvelleDepense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get all of depenses of user
router.get('/:user_id', async (req, res) => {
    try {
        const depenses = await Depense.find({user_id: req.params.user_id});
        res.json(depenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
