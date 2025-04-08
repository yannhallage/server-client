const moongose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const app = require('./app')

dotenv.config()

const PORT = process.env.PORT || 3000

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`le serveur est lancé sur le port :  ${PORT}`)
    })

}).catch(error => {
    console.error("Erreur de connexion à MongoDB :", error);
})