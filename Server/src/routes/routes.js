const { Router } = require("express");
const userRoutes = require("./userRoutes/userRoutes")
const postRoutes = require("./postRoutes/postRoutes")

const router = Router();

router.use('/user', userRoutes)
router.use('/post', postRoutes)

module.exports = router;

// probando el merge entre ramas