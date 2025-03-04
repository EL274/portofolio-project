const express = require('express');
const app = express();
const app = require('./app');

app.get('/', (req, res) => {
  res.send('welcome on FinEase');
})
const PORT = process.env.PORT || 5000

// Démarrer le serveur
app.listen (PORT, () => {
  console.log(`serveur en écoute sur le port ${PORT}`);
});
