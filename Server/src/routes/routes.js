const { Router } = require("express");
const usersRoutes = require("./userRoutes/userRoutes")
const postsRoutes = require("./postRoutes/postRoutes")
const plansRoutes = require("./plansRoutes/plansRoutes")
const chatsRoutes = require("./chatsRoutes/chatsRoutes")

const router = Router();


router.use('/users', usersRoutes)
router.use('/posts', postsRoutes)
router.use('/plans', plansRoutes)
// router.use('/chats', chatsRoutes)

module.exports = router;