const { User } = require("../DB_config");
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token: ACCESS_TOKEN
})

exports.createOrder = async (paymentData) => {
        const { userId, title, description, price } = paymentData
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
                failure: "http://localhost:3001/plans/failure",
                pending: "http://localhost:3001/plans/pending",
                success: "http://localhost:3001/plans/success"
            }
        }

        const response = await mercadopago.preferences.create(preference);

        const respuesta = {response, userId};

        return respuesta
    } catch (error){
        res.status(400).json({error: error.message});
    }
} 

exports.successfullPurchase = async (purchaseUserId) => {
try{
    const user = await User.findByPk(purchaseUserId)
    
    const premiumNew = await user.update({
        plan: "Premium"
      });

} catch (error){
    res.status(400).json({error: error.message});
}
} 

exports.pendingPurchase = async () => {
    try{
        res.status(200).send("La compra esta en estado pendiente")
    } catch (error){
        res.status(400).json({error: error.message});
    }
    } 
    exports.failedPurchase = async () => {
        try{
            res.status(400).send("La compra a fallado")
        } catch (error){
            res.status(400).json({error: error.message});
        }
        } 