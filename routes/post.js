import express from "express";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/post.js";
import { createPostValidator } from "../helpers/index.js";

import { requireSignin } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router()
router.get('/', getPosts)
router.post('/', requireSignin,createPostValidator,createPost)
router.put('/:id', requireSignin, createPostValidator,updatePost);
router.delete('/:id', requireSignin,deletePost);

export default router