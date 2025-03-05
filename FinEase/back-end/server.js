const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoD
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('connecté à MongoDB'))
 .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

 //Routes
 app.use('/api/Depenses', require('./routes/Depenses'));
 app.use('/api/Objectifs', require('./routes/Objectifs'));
 app.use('/api/Users', require('./routes/Users'));
 app.use('/api/Categories', require('./routes/Catégories'));
 app.use('/api/Conseils', require('./routes/Conseils'));

 app.listen(PORT,  () => {
    console.log('Server is running on port ${PORT}');
 });
 
 module.exports = app;
