// MultiApiBackend/Controllers/userController.js
const db = require('../../database/database'); // Assurez-vous que le chemin est correct

const getUsers = (req, res) => {
  // Mise à jour du nom de la table ici
  const query = 'SELECT id, nom_utilisateur, email FROM utilisateurs';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
    res.json(results);
  });
};

module.exports = {
  getUsers,
};
