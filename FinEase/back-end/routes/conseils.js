const express = require('express');
const { genererConseils } = require('../service/conseilService');
const router  = express.Router();

router.get ('/:user_id', async (req, res) => {
    try {
        const userId = req.params.user_id;

        if (!userId) {
            return res.status(400).json({ message: "L' ID user est requis."});
        }

        console.log(`generer des conseils pour le user : ${userId}`);

        const conseils = await genererConseils(userId);
        res.json(conseils);
    } catch (err) {
        console.error("Erreur lors de la generation des conseils :", err);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

module.exports = router;
