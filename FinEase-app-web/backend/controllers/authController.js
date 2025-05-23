const crypto = require('crypto');
const nodemailer = require('nodemailer');
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

    //debug: vérifier les donées reçues
    console.log('Tentative de connexion avec:', { email, password: password ? '*****'
      : 'non fourni' }); 
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
    //debug: Afficher lre hash stocké
    console.log('Comparaison mot de passe pour:', user.email); 

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Mot de passe incorrect pour email:',email);
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Génération du Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    // Configurez le cookie 
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    //Réponse unique avec informations utilisateur
    res.status(200).json({
      message: " Connexion réussie",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ error: "Erreur lors de la connexion" });
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

exports.forgotPassword = async (req, res) => {
  const { email} = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ error: "Aucun compte n'est associé à ce mail."});
    }

    //Générer du token et expiration
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = Date.now() + 3600000; 
    
    await user.save();

    //Envoi de l'email(configuration à adapter)
    const transporter = nodemailler.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER?
        password: process.env.EMAIL_PASSWORD,
      },
    });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await transporter.sendMAIL({
      to: user.email,
      subject: 'Réinitialisation du mot de passe',
      html: `Cliquez <a href="${resetLink}">ici</a> pour réinitialiser votre mot de passe:`,
    });

    res.status(200).json({ message: "Email de réinitialisation envoyé."})
  } catch(err) {
    res.status(500).json({ message: "Erreur serveur."});
  }
};

exports.resetPassword = async (req, res) => {
  const token = req.params;
  const {newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: Token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error : "Token invalide ou expiré "});
    }
    //Hacher le nouveau mot de passe et la mise à jour 

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Mot de passe réinitialisé et mise à jour avec succès."});
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
};
