const express = require("express")
const {getPosts,createPost} = require("../controllers/post.js")
const router = express.Router()
const {createPostValidator}= require('../helpers/index.js')
router.get('/', getPosts)

// router.get('/',(req,res,next)=>{
//     console.log("Hello World")
//     res.send("Posts endpoint")
// });

router.post('/post', createPostValidator,createPost)


module.exports = router