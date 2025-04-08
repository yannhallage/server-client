const moongose = require('mongoose')

const Personnels =  moongose.Schema({
    matricule : {
        type : String,
        required : true,
        unique :true
    },
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    telephone: {
        type: String,
        required: true
    }
},
{Timestamp : true}
)
module.exports = moongose.model('Personnels',Personnels)

