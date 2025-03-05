const exppress = require('express');
const Categorie = require('../models/Categorie');
const router = exppress.Router();

//Ajouter une categorie
router.post('/', async (req, res) => {
    const { nom, user_id } = req.body;
    try {
        const nouvelleCategorie = new Categorie({ nom, user_id });
        await nouvelleCategorie.save();
        res.status(201).json(nouvelleCategorie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Obtenir toutes les catégories d'un utilisateur
router.get('/:user_id', async (req, res) => {
    try {
        const categories = await Categorie.find({ user_id: req.params.user_id });
        res.json(categories);
    }   catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Supprimer une categorie
router.delete('/:id', async (req, res) => {
    try {
        await Categorie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Catégorie supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
