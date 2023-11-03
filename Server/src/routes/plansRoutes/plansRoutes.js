const express = require("express");
const router = express.Router();
const plansController = require("../../controllers/plansController");
require("dotenv").config();

let purchaseUserId = "";

router.post('/create-order', async(req, res) =>{
    const paymentData = req.body
    try{
        const response = await plansController.createOrder(paymentData);
        purchaseUserId = response.userId
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.get('/success', async(req, res) =>{
    try{
        await plansController.successfullPurchase(purchaseUserId);
        return res.status(200)
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.get('/failedPurchase', async(req, res) =>{
    try{
        // hacer que nos lleve a una ruta con un cartel en la pagina
        console.log("La compra fallo")
        return res.status(400)
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.get('/pending', async(req, res) =>{
    try{
        // hacer que nos lleve a una ruta con un cartel en la pagina
        console.log("La compra esta en estado pendiente")
        return res.status(200)
    } catch(error){
        return res.status(400).json(error.message)
    }
})

module.exports = router;