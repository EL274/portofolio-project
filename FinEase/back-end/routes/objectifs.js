const express = require('express');
const Objectif = require('../models/Objectif');
const Joi = require('joi')
const router = express.Router();

const objectifSchema = Joi.object({
    description: Joi.string().required(),
    montant: Joi.number().required(),
    dateLimite: Joi.date().required(),
    user_id: Joi.string().required(),
});

router.post('/', async (req, res) =>{
    const{ error } = objectifSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

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
        if (!objectif) {
            return res.status(404).json({ message: 'Objectif introuvable'})
        }
        res.json({ message: 'Objectif supprime' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
module.exports = router;
