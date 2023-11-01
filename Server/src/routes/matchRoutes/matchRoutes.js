const express = require('express');
const router = express.Router();
const matchController = require("../../controllers/matchControllers");

// Ruta para obtener las coincidencias de un usuario
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const matches = await matchController.findMatches(userId);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
