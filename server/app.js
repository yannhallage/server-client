const express = require('express')
const app = express();
const route = require('./routes/crudPresonnel.route')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// premiere route 
app.use('/api/personnel', route)


module.exports = app