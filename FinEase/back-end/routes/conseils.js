const express = require('express');
const { genererConseils } = require('../service/conseilService');
const router  = express.Router();

router.get ('/:user_id', async (req, res) => {
    try {
        const userId = req.params.user_Id;

        if (!userId) {
            return res.status(400).json({ message: "L' ID user est requis."});
        }
        
        console.log(`generer des conseils pour le user : ${userId}`);

        const conseils = await genererConseils(req.params.user_id);
        res.json(conseils);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
