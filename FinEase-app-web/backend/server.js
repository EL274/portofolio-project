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
app.use(cors({
   origin: process.env.FRONTEND || 'http://localhost:3000',
   credentials: true,
}

 ));
app.use(cookieParser());
app.use(morgan('combined', {
   skip: (req, res) => res.statusCode < 400
}));

//connexion à MongoDB
connectDB();

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// Route de base
app.get('/', (req, res) => {
   res.json({ message: "Bienvenue sur FinEase" });
 });
 

// Gestion des erreurs 
app.use((req, res) => {
   res.status(404).json({ message: "Route introuvable"});
});

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({
     message: "Erreur interne du serveur",
     error: process.env.NODE_ENV === 'development' ? err.message : undefined,
   });
 });


// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
   res.send("Bienvenue sur FinEase ");
});
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
