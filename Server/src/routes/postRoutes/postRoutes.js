const express = require("express");
const router = express.Router();

const postsController = require("../../controllers/postsControllers.js");


router.get('/', async(req, res) =>{
    try{
        const posts = await postsController.getAllPosts();
        return res.status(200).json(posts)
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.post('/', async (req, res) => {
  const postData = req.body;
  try {
      console.log(postData)
      const newPost = await postsController.createPost(postData);

      return res.status(201).json(newPost);
  } catch (error) {
      return res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedPost = await postsController.updatePost(id, updatedData);
        return res.status(200).json({ message: 'Resource updated successfully' })
    } catch (error) {
        return res.status(404).json({ error: error.message });
      }
    });

    router.delete("/:id", async (req, res) => {
        try {
          const { id } = req.params;
      
          const deletedPost = await postsController.deletePost(id);
      
          if (deletedPost) {
            return res.status(200).json("Post successfully deleted");
          } else {
            return res.status(404).json("Post not found");
          }
        } catch (error) {
          return res.status(500).json({ error: "There was an error deleting the post" });
        }
      });



module.exports = router;

