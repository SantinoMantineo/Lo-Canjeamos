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
                failure: "http://localhost:5173/#/",
                pending: "http://localhost:5173/#/",
                success: "http://localhost:5173/#/login"
            },
            notification_url: "https://eadb-201-190-251-186.ngrok.io/plans/webhook"
        }

        const response = await mercadopago.preferences.create(preference);

        const respuesta = {response, userId};
        

        
        return respuesta
    } catch (error){
        res.status(400).json({error: error.message});
    }
} 

exports.webhook = async (data) => {
console.log("AAA", data)
    try {
        if (data.type === "payment") {
            const user = await User.findByPk(currentUserId)

            const premiumNew = await user.update({
                plan: "Premium"
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