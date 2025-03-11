const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');
const Depense = require('../models/Depense');
const Categorie = require('../models/Categorie');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// 🔐 Authentification
router.post('/register', async (req, res) => {
    try {
        const { nom, email, password } = req.body;
        let user = await Utilisateur.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email déjà utilisé' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new Utilisateur({ nom, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Compte créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Utilisateur.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur introuvable' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// 🏦 Gestion des Dépenses
router.get('/depenses', auth, async (req, res) => {
    const depenses = await Depense.find({ utilisateur: req.user.id }).populate('categorie');
    res.json(depenses);
});

router.post('/depenses', auth, async (req, res) => {
    const { nom, montant, categorie } = req.body;
    const nouvelleDepense = new Depense({ utilisateur: req.user.id, nom, montant, categorie });
    await nouvelleDepense.save();
    res.status(201).json(nouvelleDepense);
});

// 🏷 Gestion des Catégories
router.get('/categories', async (req, res) => {
    const categories = await Categorie.find();
    res.json(categories);
});

module.exports = router;
