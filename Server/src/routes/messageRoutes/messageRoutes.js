const express = require("express");
const router = express.Router();

const messageController = require("../../controllers/messageControllers.js");


router.get("/allMessages", async (req, res) => {
  try {
    const response = await messageController.getAllMessages();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});



router.get("/:chatId", async (req, res) => {
  const { chatId } = req.params
    try {

      const response = await messageController.getMessages(chatId);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  });


  router.post("/:chatId", async (req, res) => {
    const { chatId } = req.params;
    const { userId, content } = req.body; // Asegúrate de que estos datos se envíen en el cuerpo de la solicitud
    try {
      const newMessage = await messageController.createMessage(chatId, userId, content);

      return res.status(201).json(newMessage);
    } catch (error) {
      
      return res.status(400).json(error.message);
    }
  });
  

  module.exports = router;