const express = require("express");
const router = express.Router();

const likeController = require("../../controllers//likeControllers");

router.post('/', async (req, res) => {
  try {
    const { myUserId, likedPostId, myPostId, anotherUserId } = req.body; // Asegúrate de que req.body contiene userId y postId
    const result = await likeController.createLike(myUserId, likedPostId, myPostId, anotherUserId);
    
    if (result) {
      return res.status(201).json({ message: 'Like registrado con éxito', like: result });
    } else {
      return res.status(400).json({ error: 'Error al registrar el like' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/allLikes", async (req, res) => {
  try {
    const likes = await likeController.getAllLikes();
    return res.status(200).json(likes);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.get("/getLikesRecibidos", async (req, res) => {
  const myUserId = req.query.myUserId;
  try{
    const likes = await likeController.getLikesRecibidos(myUserId);
    return res.status(200).json(likes);
  } catch(error){
    return res.status(400).json(error.message);
  }
})

router.delete("/:likeId", async (req, res) => {
  try{
  const { likeId } = req.params;

  const deletedLike = await likeController.removeLike(likeId)

  if (deletedLike) {
    return res.status(200).json(deletedLike);
  } else {
    return res.status(404).json("Like not found");
  }
} catch (error) {
  return res
    .status(500)
    .json({ error: "There was an error deleting the Like" });
}
});


module.exports = router;