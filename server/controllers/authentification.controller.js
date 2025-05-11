const Account = require('../models/personnel.model')


const PostAutthentification = async (req,res) => {
    try {
        const {email, matricule} = req.body
        const user = await Account.findOne({email, matricule})
         
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }else{
            console.log('utilisateur trouver')
        }
    }
}