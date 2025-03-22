const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Récupérer le token depuis les cookies ou les en-têtes
  const token = req.cookies.token || req.headers['authorization']?.replace('Bearer ', '');

  // Vérifier si le token est manquant
  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  // Vérifier la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: "Token expiré" });
      }
      return res.status(403).json({ message: "Token invalide" });
    }

    // Ajouter les informations de l'utilisateur à la requête
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
