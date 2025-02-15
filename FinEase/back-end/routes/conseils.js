const express = require('express');
const router = require('./objectifs');
const Conseil = rquire('../models/conseils');
const express = express.router();

router.post ('/', async, (req, res) => {
    const{ titre, description, type, lien, userI} = req.body;
    try {
        const nouveauconseil = new conseil({});
        await nouveauconseil.save();
        res.status(201).json(nouveauconseil);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;
