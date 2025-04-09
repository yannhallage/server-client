const express = require('express')
const route_notifications = express.Router()
const { GetNotifications,
    PostNotification } = require('../controllers/notifications.controller')

route_notifications.get('/', GetNotifications)
route_notifications.post('/', PostNotification)

module.exports = route_notifications