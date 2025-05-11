const express = require('express')
const app = express();
const route = require('./routes/crudPresonnel.route')
const route_notifications = require('./routes/notifications.route')
const route_authentifcation = require('./routes/authentification.route')
const cors = require('cors')

// autorisation du client avec cors
app.use(cors({
    origin: 'http://localhost:5173', // autorisation du frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/personnel', route);
app.use('/api/authentification', route_authentifcation);

app.use('/api/notification', route_notifications);


module.exports = app