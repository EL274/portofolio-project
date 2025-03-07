const express = require('express');
const Objectif = require('../models/Objectif');
const router = express.Router();

router.post('/', async (req, res) =>{
    const { description, montant, dateLimite, user_id } =req.body;
    try {
        const nouvelObjectif = new Objectif({ description, montant, dateLimite, user_id});
        await nouvelObjectif.save();
        res.status(201).json(nouvelObjectif);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Obtenir tous les objectifs d'un utilisateur

router.get('/', async (req, res) => {
    try {
        const objectifs = await Objectif.find();
        res.json(objectifs);
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
})

//supprimer un objectif
router.delete('/:id', async (req, res) => {
    try {
        await Objectif.findByIdAndDelete(req.params.id);
        res.json({ message: 'Objectif supprime' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
module.exports = router;
