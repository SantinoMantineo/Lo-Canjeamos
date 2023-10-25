const express = require("express");
const router = express.Router();
const userController = require("../../controllers/usersControllers");

router.get('/', async(req, res) =>{
    try{
        const response = await userController.getAllUser();
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.post('/addUser', async(req, res) =>{
    const user = req.body;
    try{
        const response = await userController.createUser(user);
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedUser = await userController.updateUser(id, updatedData);
        return res.status(200).json({ message: 'Resource updated successfully' })
    } catch (error) {
        return res.status(404).json({ error: error.message });
      }
    });

module.exports = router;