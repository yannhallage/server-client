const Notifications = require('../models/notifications.model')


const GetNotifications = async (req, res) => {
    try {
        const notifications = await Notifications.find({})

        if (!notifications) {
            return res.status(404).json({ message: 'aucune notifications trouvées' })
        }

        res.status(200).json({
            notifications: notifications
        })
    }
    catch (err) {
        res.status(500).json({ message: 'erreur de serveur', error: err })
    }
}

const PostNotification = async (req, res) => {
    try {
        // const { message } = req.body
        const notification = await Notifications.create(req.body)
        const io  = req.app.get('io')

        io.emit("newNotification", notification);

        res.status(200).json({ message: 'notification créée avec succès', notification })
    } catch (error) {
        res.status(500).json({ message: 'erreur de serveur', error: error })
    }
}

module.exports = {
    GetNotifications,
    PostNotification
}