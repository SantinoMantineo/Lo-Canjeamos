const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userControllers");

router.get('/', async(req, res) =>{
    try{
        const response = await userController.userController();
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
})
module.exports = router;