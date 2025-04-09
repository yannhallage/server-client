const mongoose = require('mongoose')

const Notifications = mongoose.Schema({
    message :{
        type:String,
        required:true
    }

},
{Timestamp : true}
)
module.exports = mongoose.model('Notifications', Notifications);