const mongoose = require('mongoose')

const Accounts = mongoose.Schema({
    matricule :{
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    }
},
{Timestamp : true}
)
module.exports =  mongoose.model('Accounts',Accounts)