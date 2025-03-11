const mongoose = require('mongoose');

const DepenseSchema = new mongoose.Schema({
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    nom: { type: String, required: true },
    montant: { type: Number, required: true },
    categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Depense', DepenseSchema);
