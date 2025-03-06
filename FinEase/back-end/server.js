const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoD
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connecté à MongoDB'))
 .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

 //Routes
 app.use('/api/depenses', require('./routes/depenses'));
 app.use('/api/objectifs', require('./routes/objectifs'));
 app.use('/api/users', require('./routes/users'));
 app.use('/api/categories', require('./routes/categories'));
 app.use('/api/conseils', require('./routes/Conseils'));

 app.listen(PORT,  () => {
    console.log(`Server is running on port ${PORT}`);
 });
 
 module.exports = app;
