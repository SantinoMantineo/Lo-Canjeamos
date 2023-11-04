const express = require("express");
const router = express.Router();
const userController = require("../../controllers/usersControllers");
const validInfo = require("../../middleware/validInfo");
const authorization = require("../../middleware/authorization");

router.get("/allUsers", async (req, res) => {
  try {
    const response = await userController.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.post("/register", validInfo, async (req, res) => {
  const user = req.body;
  try {
    const response = await userController.createUser(user);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.post("/registerGoogle", validInfo, async (req, res) => {
  const user = req.body;
  try {
    const response = await userController.createGoogleUser(user);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.post("/login", validInfo, async (req, res) => {
  const user = req.body;
  try {
    const response = await userController.loginUser(user);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get("/userId", authorization, async (req, res) => {
  try {
    const response = await userController.getUserId(req.body.user);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedUser = await userController.updateUser(id, updatedData);
    return res.status(200).json({ message: "Resource updated successfully" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userController.deleteUser(id);
    return res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await userController.forgotPassword(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.post('/reset-password/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const result = await userController.resetPassword(id, password);

  try{
    if (result) {
      return res.status(200).json(result);
    }
  }catch (error){
    return res.status(400).json(error.message);
  };
})

module.exports = router;