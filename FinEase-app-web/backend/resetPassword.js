require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const newHash = await bcrypt.hash("TRes8R@.5", 10);
    
    await mongoose.connection.db.collection('users').updateOne(
      { email: "backendfinease@gmail.com" },
      { $set: { password: newHash } }
    );
    
    console.log("Mot de passe réinitialisé avec succès !");
    process.exit(0);
  } catch (err) {
    console.error("Erreur:", err);
    process.exit(1);
  }
})();
