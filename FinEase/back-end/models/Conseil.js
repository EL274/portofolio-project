const { MongoTopologyClosedError } = require('mongodb');
const mongoose = require('mongoose');

const ConseilSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, rquired: true },
    type: { type: String, enum: ['conseil', 'ressource', 'outil'], required: true }, // Type de solution
    lien: { type: String }, // Lien vers une ressource externe
});

modules.exports = mongoose.model('Conseil', ConseilSchema)
 