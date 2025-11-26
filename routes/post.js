const express = require("express")
const postController = require("../controllers/post.js")
const router = express.Router()

router.get('/', postController.getPosts)

// router.get('/',(req,res,next)=>{
//     console.log("Hello World")
//     res.send("Posts endpoint")
// });



module.exports = router