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
mongoose.connect(process.env.MONGO_URI)
   .then (() => console.log("Connecté à MongoDB"))
   .catch(err => console.error("Erreur de connexion à MongoDB:", err));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
   res.send("Bienvenue sur FinEase ");
});
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
