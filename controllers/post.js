import Post from '../models/post.js'
import { body, validationResult } from 'express-validator';




export const getPosts=(req,res)=>{
    const posts = Post.find().select("_id title content")
    .then((posts)=>{
        res.status(200).json({
            posts:posts
        })
    })
    .catch(err=>console.log(err ))
}



export const createPost = async (req, res) => {
    // Check for validation errors here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const post = new Post(req.body);
        const savedPost = await post.save();
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: savedPost
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            req.body,
            { new: true } // return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            post: updatedPost
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};