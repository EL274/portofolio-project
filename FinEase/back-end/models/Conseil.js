const { MongoTopologyClosedError } = require('mongodb');
const mongoose = require('mongoose');

const ConseilSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['conseil', 'ressource', 'outil'], required: true }, // Type de solution
    lien: { type: String }, // Lien vers une ressource externe
    user_id: { type: String, required: true } // lier le conseil à un utilisateur
});

module.exports = mongoose.model('Conseil', ConseilSchema)
 