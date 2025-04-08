const Personnels = require('../models/personnel.model')


// cas d'une creation 
const PostPersonnel = async (req, res) => {
    try {
        const personnel = await Personnels.create(req.body)
        res.status(201).json({
            message: "le personnel a été crée ! "
        })
    }
    catch (error) {
        res.status(500).json({
            message: "une erreur est survenue lors de la creation du personnel",
        })
    }
}

// cas d'un get 
const GetPersonnels = async (req, res) => {
    try {
        const personnels = await Personnels.find({})
        res.status(200).json({
            personnels
        })
    } catch (erro) {
        res.status(500).json({
            message: "une erreur est survenue lors de la recuperation des personnels"
        })
    }
}

// cas d'un get avec un id 
const GetPersonnel = async (req, res) => {
    try {
        const { id } = req.params
        const personnel = await Personnels.findById(id)

        if (!personnel) {
            return res.status(404).json({
                message: "le personnel n'existe pas"
            })
        }
        res.status(200).json({
            personnel
        })
    }
    catch (error) {
        res.status(500).json({
            message: "une erreur est survenue lors de la recuperation du personnel"
        })
    }
}

// cas d'une suppression 
const DeletePersonnel = async (req, res) => {
    try {
        const { id } = req.params
        const personnel = await Personnels.findByIdAndDelete(id)

        if (!personnel) {
            return res.status(404).json({
                message: "le personnel n'existe pas"
            })
        }

        res.status(200).json({
            message: "le personnel a ete supprime avec succes"
        })
    } catch (error) {
        res.status(500).json({
            message: "une erreur est survenue lors de la suppression du personnel"
        })
    }
}

// cas d'un update

const UpdatePersonnel = async (req, res) => {
    try {
        const { id } = req.params
        const personnel = await Personnels.findByIdAndUpdate(id, req.body, {new :true})

        if (!personnel) {
            return res.status(404).json({
                message: "le personnel n'existe pas"
            })
        }

        res.status(200).json({
            message: "le personnel a ete mis a jour avec succes"
        })
    }catch(error){
        res.status(500).json({
            message: "une erreur est survenue lors de la mise a jour du personnel"
        })
    }
}

// exports
module.exports = {
    GetPersonnel,
    GetPersonnels,
    PostPersonnel,
    DeletePersonnel,
    UpdatePersonnel
}