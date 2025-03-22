const mongoose = require('mongoose');

// Fonction pour se connecter à MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    });
        console.log(" Connecté à MongoDB");
    
    console.log('Connecté à MongoDB');
    } catch (error) {
        console.error(" Erreur de connexion à MongoDB :", error);
        process.exit(1); // Arrête le serveur si la connexion échoue
    }
};

module.exports = connectDB;
