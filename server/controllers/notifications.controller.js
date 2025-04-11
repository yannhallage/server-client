const Notifications = require('../models/notifications.model')


const GetNotifications = async (req, res) => {
    try {
        const notifications = await Notifications.find({})

        if (!notifications) {
            return res.status(404).json({ message: 'aucune notifications trouvées' })
        }

        res.status(200).json({
            notifications
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
        const io = req.app.get('io')
        if (notification){
            console.log(notification)
        }
        io.emit("newNotification", notification);

        res.status(200).json({ message: 'notification créée avec succès', notification })
    } catch (error) {
        res.status(500).json({ message: 'erreur de serveur', error: error })
    }
}

const DeleteAllNotification = async (req, res) => {

    try {
        const notification = await Notifications.deleteMany({})
        res.status(200).json({
            message: 'toutes les notifications ont été supprimées avec succès',
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'erreur de serveur',
        })

    }
}
module.exports = {
    GetNotifications,
    PostNotification,
    DeleteAllNotification
}