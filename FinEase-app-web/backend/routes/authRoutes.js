const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/register', [
    body('name').isLength({ min: 3 }).withMessage("Le nom doit avoir au moins 3 caractères"),
    body('email').isEmail().withMessage("L'email est invalide"),
    body('password').isLength({ min: 6 }).withMessage("Le mot de passe doit avoir au moins 6 caractères")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
});


// Inscription
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (err) {
        res.status(400).json({ error: "Erreur lors de l'inscription" });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true }).json(user);
    } catch (err) {
        res.status(400).json({ error: "Erreur de connexion" });
    }
});

// Déconnexion
router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: "Déconnecté" });
});

module.exports = router;
