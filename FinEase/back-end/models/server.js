const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Correction de "mongoo.se" => "mongoose"
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB')) // Correction de l'affichage
    .catch(err => console.error('Erreur de connexion à MongoDB:', err)); // Correction du catch

app.get('/', (req, res) => {
    res.send('API de gestion de budget');
});

// Correction de l'affichage du port
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
