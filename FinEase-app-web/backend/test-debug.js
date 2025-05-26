const bcrypt = require('bcryptjs');

(async () => {
  const hashFromDB = '$2b$10$ZORR6YIHlAfXMpDTcKo9H.b/BbXL47r4Z2HfNXkGMxzK2YKl3OLqS'
  const plainPassword = "TRes8R@.5"; // Mot de passe que tu essaies

  const isMatch = await bcrypt.compare(plainPassword, hashFromDB);
  console.log("Résultat :", isMatch ? "✅ CORRECT" : "❌ FAUX");
})();
