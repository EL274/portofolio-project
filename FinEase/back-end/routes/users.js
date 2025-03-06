const express =  require ('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

//put your ID(inscription)
router.post('/inscription', async (req, res) => {
  const { nom, email, motDepasse } = req.body;
  try {
    const user = new User({ nom, email, motDepasse});
    await user.save();
    res.status(201).json({ message: 'User créé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//connexion 
router.post('/connexion', async (req, res) => {
  const { email, motDepasse } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(motDepasse, user.motDePasse)) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

