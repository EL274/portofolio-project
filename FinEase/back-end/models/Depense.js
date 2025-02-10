const mongoose = require('mongoose');

const DepenseSchema = new mongoose.Schema({
    montant: { type: Number, required: true },
    categorie: { type: String, required: true },
    date: { type: Date, default: Date.now },
    utilisateur_id: { type: String, required: true }
});
