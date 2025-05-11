const Account = require('../models/personnel.model');
const jwt = require('jsonwebtoken');


const PostAutthentification = async (req, res) => {
    try {
        const { matricule, email } = req.body
        const user = await Account.findOne({ matricule, email })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        // Générer un token
        const token = jwt.sign(
            { matricule: user.matricule, email: user.email }, // données à encoder
            'votre_cle_secrete_super_secrete',
            { expiresIn: '1h' } // expiration (1 heure)
        );
        res.status(200).json({
            message: 'Utilisateur trouvé',
            token,  // on retourne le token au client
        });
    }
    catch (error) {
        console.error("Erreur lors de la verification:", error)
        res.status(500).json({
            message: 'Erreur lors de la verification',
        })
    }
}
module.exports = { PostAutthentification };