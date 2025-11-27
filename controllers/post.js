import Post from '../models/post.js'
import { body, validationResult } from 'express-validator';

// Add this validation chain
export const validateCreatePost = [
    body('title')
        .isLength({ min: 4 }).withMessage('Title must be at least 4 characters')
        .isLength({ max: 50 }).withMessage('Title cannot exceed 50 characters'),
    body('content')
        .isLength({ min: 4 }).withMessage('Content must be at least 4 characters')
];


export const getPosts=(req,res)=>{
    const posts = Post.find().select("_id title content")
    .then((posts)=>{
        res.status(200).json({
            posts:posts
        })
    })
    .catch(err=>console.log(err ))
}

export const createPost= async (req,res)=>[

    validateCreatePost,

    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

   try {const post = new Post(req.body)
    console.log("Creating Post ", req.body)

    const savedPost = await post.save();
    
    
    res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: savedPost
        });}

        catch(error){

            res.status(500).json({
                success: false,
                message: 'Server error'
            });

        }
    }
];