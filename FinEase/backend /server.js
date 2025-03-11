require('dotenv').config();  // Charger les variables d’environnement
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(express.json());
app.use(cors());

connectDB(); // Connexion MongoDB

app.use('/expenses', expenseRoutes); // Définir les routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
