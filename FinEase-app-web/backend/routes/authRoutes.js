const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * Routes d'authentification
 * POST /auth/register - Crée un nouvel utilisateur
 * POST /auth/login - Connecte un utilisateur
 * POST /auth/logout - Déconnecte l'utilisateur
 * GET /auth/me - Récupère les données de l'utilisateur connecté
 */

// Enregistrement
router.post('/register', [
  body('name')
    .trim() 
    .isLength({ min: 3 })
    .withMessage("Le nom doit avoir au moins 3 caractères"),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("L'email est invalide"),
  body('password')
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit avoir au moins 6 caractères")
], authController.register);

// Connexion
router.post('/login', [
  body('email').isEmail().withMessage("L'email est invalide"),
  body('password').exists().withMessage("Le mot de passe est requis")
], authController.login);

// Déconnexion
router.post('/logout', authController.logout);

// Données utilisateur (protégé)
router.get('/user', authenticateToken, authController.getUserData);

//mot de passe oublié 
router.post('/forgot-password', 
  body('email').isEmail().withMessage("Email invalide"),
  authController.forgotPassword
);

//Réinitialisation du mot de passe

router.post('/reset-password/:token', [
  body('newPsassword').isLength({ min: 6 }).withMessage("le mot de passe doit avoir au moins 6 caractères")
], authController.resetPassword);

module.exports = router;
