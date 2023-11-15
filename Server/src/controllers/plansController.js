const { User } = require("../DB_config");
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token: ACCESS_TOKEN
}) 

let currentUserId;

exports.createOrder = async (paymentData) => {
        const { userId, title, description, price } = paymentData
        currentUserId = userId
    try{
        let preference = {
            items: [{
                userId: userId,
                title: title,
                quantity: 1,
                unit_price: price,
                currency_id: "ARG",
                description: description,
            }],
            back_urls: {  // Corrected property name to 'back_urls'
                failure: "https://locanjeamos.com.ar/#/login",
                pending: "https://locanjeamos.com.ar/#/login",
                success: "https://locanjeamos.com.ar/#/login"
            },
            notification_url: "https://lo-canjeamos-production.up.railway.app/plans/webhook"
        }

        const response = await mercadopago.preferences.create(preference);

        const respuesta = {response, userId};
        

        
        return respuesta
    } catch (error){
        res.status(400).json({error: error.message});
    }
} 

exports.webhook = async (data) => {
    try {
        if (data.type === "payment") {
            const user = await User.findByPk(currentUserId)

            const premiumNew = await user.update({
                plan: "premium"
            });
            if(premiumNew){
                return true
            }
        } else {
            throw new Error("Invalid webhook event type");
        }
    } catch (error) {
        return {
            error: error.message
        };
    }
}