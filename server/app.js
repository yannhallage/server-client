const express = require('express')
const app = express();
const route = require('./routes/crudPresonnel.route')
const cors = require('cors')

// autorisation du client avec cors
app.use(cors({
    origin: 'http://localhost:5173', // autorise ton frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// premiere route 
app.use('/api/personnel', route)


module.exports = app