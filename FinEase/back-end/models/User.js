const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDepasse: { type: String, required: true }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('motDePasse')) {
        this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
