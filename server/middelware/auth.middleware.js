const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // On récupère le token dans l'en-tête

  if (!token) {
    return res.status(403).json({ message: 'Aucun token fourni' });
  }

  jwt.verify(token, 'votre_cle_secrete_super_secrete', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }

    // Le token est valide → on met les infos décodées dans req.user
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
