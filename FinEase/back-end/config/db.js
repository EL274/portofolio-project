const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifieldTopology: true});
        console.log('Connecté à MongoDB');
    } catch (err) {
        console.error('Erreur de connexion à MongoDB:', err.message);
        process.exit(1);
    }
};
