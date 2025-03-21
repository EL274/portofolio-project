require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');



// import routes 
const authRoutes = require('./routes/authRoutes');
const  transactionRoutes = require('./routes/transactionRoutes.js');
const budgetRoutes = require('./routes/budgetRoutes');
const connectDB = require('./db');

const app = express();

//middlewares
app.use(express.json());
app.use(cors( ));
app.use(cookieParser());
app.use(morgan('dev'));

//connexion à MongoDB
connectDB();

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// Gestion des erreurs 
app.use((req, res) => {
   res.status(404).json({ message: "Route introuvable"});
});

app.use((error, req, res, next) => {
   console.error(error.stack);
   res.status(500).json({ message: "Erreur interne du serveur" });
});


// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
   res.send("Bienvenue sur FinEase ");
});
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
