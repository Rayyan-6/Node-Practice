import express from "express";
import { getPosts, createPost } from "../controllers/post.js";
import { createPostValidator } from "../helpers/index.js";

import { requireSignin } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/requireRole.js";

// router.get('/',(req,res,next)=>{
//     console.log("Hello World")
//     res.send("Posts endpoint")
// });
const router = express.Router()
router.get('/', getPosts)
router.post('/post', requireSignin,createPostValidator,createPost)


// module.exports = router

export default router