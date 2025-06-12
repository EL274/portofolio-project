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
  res.status(500).json({ error: `Erreur serveur lors de ${context}` });
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

    sendAuthToken(res, user);

    res.status(201).json({ 
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    handleServerError(res, err, "l'inscription");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('Utilisateur non trouvé pour email:', email);
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    console.log('Comparaison mot de passe pour:', email);
    console.log('Mot de passe fourni:', password);
    console.log('Mot de passe haché en base:', user.password);

    // Test manuel de vérification (debug)
    const manualCheck = await bcrypt.compare(password, user.password);
    console.log('Résultat comparaison bcrypt:', manualCheck);

    if (!manualCheck) {
      console.log('Échec comparaison mot de passe pour:', email);
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Génération du Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    // Configuration du cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Réponse avec informations utilisateur
    res.status(200).json({
      message: "Connexion réussie", token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Erreur détaillée lors du login:', err);
    res.status(500).json({ error: "Erreur serveur lors de la connexion" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: "Déconnecté avec succès" });
};

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (err) {
    handleServerError(res, err, "la récupération des données utilisateur");
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Aucun compte associé à cet email" });
    }

    // Génération du token et expiration
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    
    await user.save();

    // Configuration de l'email (à adapter selon ton SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: 'Réinitialisation du mot de passe',
      html: `Cliquez <a href="${resetLink}">ici</a> pour réinitialiser votre mot de passe.`,
    });

    res.status(200).json({ message: "Email de réinitialisation envoyé" });
  } catch (err) {
    console.error('Erreur forgotPassword:', err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Token invalide ou expiré" });
    }

    // Hachage et mise à jour
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (err) {
    console.error('Erreur resetPassword:', err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
