const express = require("express");
const router = express.Router();

const chatsControllers = require("../../controllers/chatsControllers"); // Asegúrate de importar el modelo de Chat


router.get("/allChats", async (req, res) => {
  try {
    const response = await chatsControllers.getAllChats();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});


//crear chat
router.post("/create", async (req, res) => {
  const { userId, anotherUserId } = req.body;
  try {
    const response = await chatsControllers.createChat(userId, anotherUserId);

    return res.status(201).json({ chatId: response.id }); // Devuelve el ID del chat recién creado
  } catch (error) {
    console.error("Error al crear el chat:", error);
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
