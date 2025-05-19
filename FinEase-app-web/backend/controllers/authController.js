const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Fonctions utilitaires réutilisables
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const handleServerError = (res, err, context) => {
  console.error(`Erreur lors de ${context}:`, err);
  res.status(500).json({ error: `Erreur lors de ${context}` });
};

const sendAuthToken = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

// Contrôleurs
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    handleServerError(res, err, "l'inscription");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    sendAuthToken(res, user);
    res.json({ message: "Connexion réussie" });
  } catch (err) {
    handleServerError(res, err, "la connexion");
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: "Déconnecté" });
};

exports.getUserData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    handleServerError(res, err, "la récupération des données utilisateur");
  }
};
