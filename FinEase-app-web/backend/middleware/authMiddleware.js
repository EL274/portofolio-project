const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log("Cookies reçues :", req.cookies);
    // verifie si le token est présent dans les cookies
    const token = req.cookies.token;
    if (!token) {
        console.log("Token non trouvé dans les cookies");
        return res.status(401).json({ error: "Accès non autorisé" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Erreur de vérification du token :", error.message);
        res.status(401).json({ error: "Token invalide" });
    }
};

module.exports = authMiddleware;
