const express = require("express");
const router = express.Router();

const likeController = require("../../controllers//likeControllers");

router.post('/', async (req, res) => {
  try {
    const { myUserId, likedPostId, myPostId, anotherUserId } = req.body; // Asegúrate de que req.body contiene userId y postId
    const result = await likeController.createLike(myUserId, likedPostId, myPostId, anotherUserId);
    
    if (result) {
      return res.status(201).json({ message: 'Like registrado con éxito' });
    } else {
      return res.status(400).json({ error: 'Error al registrar el like' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;