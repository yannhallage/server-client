const express = require('express')
const verifyToken  = require('../middelware/auth.middleware')
const route = express.Router()
const {
    GetPersonnel,
    GetPersonnels,
    PostPersonnel,
    DeletePersonnel,
    UpdatePersonnel,
    DeletAllPersonnel
} = require('../controllers/crudPersonnel.controller')



// cas d'un get 
route.get('/', verifyToken, GetPersonnels)

// recuperation en fonction de l'id 
route.get('/:id', GetPersonnel)

// // dans le cas d'une creation 
route.post('/',PostPersonnel)

// // dans le cas d'une mise a jour
route.put('/:id',UpdatePersonnel)

// // dans le cas d'une suppression
route.delete('/:id',DeletePersonnel)

// cas de suppression all data
route.delete('/',DeletAllPersonnel)



module.exports = route