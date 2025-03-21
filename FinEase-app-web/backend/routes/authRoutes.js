const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/authenticateToken'); // Correction du nom du middleware

const router = express.Router();

// Inscription avec validation
router.post('/register', [
  body('name').isLength({ min: 3 }).withMessage("Le nom doit avoir au moins 3 caractères"),
  body('email').isEmail().withMessage("L'email est invalide"),
  body('password').isLength({ min: 6 }).withMessage("Le mot de passe doit avoir au moins 6 caractères")
], async (req, res) => {
  // Valider les données
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Réponse
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Envoyer le token dans un cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).json({
      message: "Connexion réussie",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Erreur de connexion :", err);
    res.status(500).json({ error: "Erreur de connexion" });
  }
});

// Déconnexion
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: "Déconnecté" });
});

// Route pour récupérer les données de l'utilisateur connecté
router.get('/auth/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (err) {
    console.error("Erreur lors de la récupération des données utilisateur :", err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
