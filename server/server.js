const moongose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const http = require('http')
const { Server } = require('socket.io')
const app = require('./app')


dotenv.config()

const PORT = process.env.PORT || 3000



connectDB().then(() => {

    const serverHttp = http.createServer(app)

    const io = new Server(serverHttp, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ["GET", "POST"],
            credentials: true
        },
    })

    // gerer les connexions avec sockets io 
    io.on("connection", (socket) => {
        console.log("new connection with socket")

        // Gérer la déconnexion
        socket.on('disconnect', () => {
            console.log('Un utilisateur a quitté:', socket.id);
        });
    })

    app.set('io',io)
    
    serverHttp.listen(PORT, () => {
        console.log(`Le serveur est lancé sur le port : ${PORT}`);
    });

}).catch(error => {
    console.error("Erreur de connexion à MongoDB :", error);
})