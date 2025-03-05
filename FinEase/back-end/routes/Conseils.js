const express = require('express');
 const { genererConseils } = require('../service/conseilService');
const express = express.router();

router.get ('/:user_id ', async (req, res) => {
    try {
        const conseils = await genererConseils(req.params.user_id);
        res.json(conseils);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
