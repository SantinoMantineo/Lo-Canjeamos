const express = require("express");
const router = express.Router();
const plansController = require("../../controllers/plansController");

router.get('/createOrder', async(req, res) =>{
    try{
        const response = await plansController.createOrder();
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.get('/success', async(req, res) =>{
    try{
        const response = await plansController.getPlanById();
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
})


router.get('/webhook', async(req, res) =>{
    try{
        const response = await plansController.getPlanById();
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
})

module.exports = router;