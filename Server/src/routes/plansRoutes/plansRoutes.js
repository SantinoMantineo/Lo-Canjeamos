const express = require("express");
const router = express.Router();
const plansController = require("../../controllers/plansController");

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
    console.log(req.body)
    try{
        await plansController.successfullPurchase(purchaseUserId);
        return res.send("Success")
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.get('/failed', async(req, res) =>{
    try{
        return res.sebd("Failure")
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.get('/pending', async(req, res) =>{
    try{
        return res.send("Pending")
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.post('/webhook', async(req, res) =>{
    const data = req.query

    try{
        const response = await plansController.webhook(data);
        return res.json(response); 
    } catch(error){
        return res.status(400).json(error.message)
    }
})

module.exports = router;