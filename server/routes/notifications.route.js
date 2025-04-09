const express = require('express')
const route_notifications = express.Router()
const { GetNotifications,
    PostNotification , DeleteAllNotification} = require('../controllers/notifications.controller')

route_notifications.get('/', GetNotifications)
route_notifications.post('/', PostNotification)
route_notifications.delete('/', DeleteAllNotification)

module.exports = route_notifications