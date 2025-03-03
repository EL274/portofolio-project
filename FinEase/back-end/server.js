const express = required('express');
const app = express();
const PORT = process.env.PORT || 5000

// Démarrer le serveur
app.listen (PORT, () => {
  console.log(`serveur en écoute sur le port ${PORT}`);
});
