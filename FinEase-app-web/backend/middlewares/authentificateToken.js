const jwt = require('jsonwebtoken');

const authentificateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];
    if (!token) return res.status(401).json({ message: "Token manquant"});

    jwt.verify(token, process.env.JWT_SECRET,(err, user) => {
        if (err) return res.status(403).json({ message: "Token invalide"});
        req.user = user;
        next();
    });

};
module.exports = authentificateToken;
