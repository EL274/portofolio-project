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
app.use(cookieParser());

// Configuration de CORS
app.use(cors({
   origin: process.env.FRONTEND_URL || 'https://localhost:3000',
   credentials: true,
   methods: [ 'GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: [ 'Content-Type', 'Authorization','X-Requested-With']
}));


// Logging des requêtes (gère uniquement les erreurs en production)
app.use(morgan(process.env.NODE_ENV ===  'development' ? 'dev' : 'combined', {
   skip: (req, res) => process.env.NODE_ENV === 'production' && res.statusCode < 400
}));

//connexion à MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dark', {
   serverSelectionTimeoutMS: 5000
})
.then(() => console.log('connecté à MongoDB (State:', mongoose.connection.readyState))
.catch(err => {
   console.error('Erreur de connexion à MongoDB:', err.message);
   console.log('Solution : Démarrer MongoDB avec Docker :');
   console.log('docker run -d --name mongodb -p 27017:27017 mongo:latest')
   process.exit(1);
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// Route de base
app.get('/', (req, res) => {
   res.json({ message: "Bienvenue sur FinEase",
      status: "Actif",
      database: mongoose.connection.readyState === 1 ? "Connecté" : "Déconnecté"
   });
 });
 

// Gestion des erreurs 
app.use((req, res) => {
   res.status(404).json({ 
      success: false,
      message: "Route introuvable"
   });
});

app.use((err, req, res, next) => {
   console.error("Erreur :", err.stack);
   res.status(500).json({
     success: false,
     message: "Erreur interne du serveur",
     error: process.env.NODE_ENV === 'development' ? err.message : undefined,
   });
 });


// Démarrage du serveur
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,() => {
   console.log(`Serveur Lancé sur http://localhost:${PORT}`);
   console.log(`Frontend :${process.env.FRONTEND_URL || 'htpps://localhost:3000'}`);
   console.log(` Base de données: ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/FinEase-app-web'}`);

});
//Gestion propres des arrêts 
process.on('SIGINT', () => {
   server.close(() => {
      mongoose.connection.close(false, () => {
         console.log('Serveur arrêté');
         process.exit(0);
      });
   });
});
