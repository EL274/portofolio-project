const mongoose = require('mongoose');

const objectifSchema = new mongoose.Schema({
    description: { type: String, required: true },
    montant: { type: Number, required: true },
    montantAtteint: { type: Number, required: true, default: 0 },
    dateLimite: { type: String, required: true },
    user_id: { type: String, required: true }  
});

module.exports = mongoose.model('Objectif', ObjectifSchema);
