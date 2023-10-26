const express = require("express");
const router = express.Router();
const userController = require("../../controllers/usersControllers");

router.get("/", async (req, res) => {
  try {
    const response = await userController.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.post("/register", async (req, res) => {
  const user = req.body;
  try {
    const response = await userController.createUser(user);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  const user = req.body;
  try {
    const response = await userController.loginUser(user);
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userController.getUserById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
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

module.exports = router;
