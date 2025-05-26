const bcrypt = require('bcryptjs');

(async () => {
  const testPass = "TRes8R@.5";
  const testHash = "$2b$10$ZORR6YIHlAfXMpDTcKo9H.b/BbXL47r4Z2HfNXkGMxzK2YKl3OLqS";
  
  console.log("Début du test...");
  console.log("Mot de passe testé:", testPass);
  console.log("Hash utilisé:", testHash);
  
  try {
    const isMatch = await bcrypt.compare(testPass, testHash);
    console.log("Résultat:", isMatch ? "✅ SUCCÈS - Les hashs correspondent" : "❌ ÉCHEC - Hashs différents");
  } catch (err) {
    console.error("Erreur lors de la comparaison:", err);
  }
})();
