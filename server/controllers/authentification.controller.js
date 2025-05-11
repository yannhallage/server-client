const Account = require('../models/personnel.model')


const PostAutthentification = async (req, res) => {
    try {
        const { matricule, email } = req.body
        const user = await Account.findOne({ matricule, email })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            res.status(200).json({
                message: 'utilisateur trouver ',matricule
            })
        }
    }
    catch (error) {
        console.error("Erreur lors de la verification:", error)
        res.status(500).json({
            message: 'Erreur lors de la verification',
        })
    }
}
module.exports = { PostAutthentification };