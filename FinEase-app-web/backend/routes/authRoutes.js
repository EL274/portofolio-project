const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const authenticateToken = require('../middleware/authenticateToken');

// Routes d'authentification
router.post('/register', [
  body('name').isLength({ min: 3 }).withMessage("Le nom doit avoir au moins 3 caractères"),
  body('email').isEmail().withMessage("L'email est invalide"),
  body('password').isLength({ min: 6 }).withMessage("Le mot de passe doit avoir au moins 6 caractères")
], authController.register);

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/user', authenticateToken, authController.getUserData);

module.exports = router;
