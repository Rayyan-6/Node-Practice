import Post from '../models/post.js'
import { body, validationResult } from 'express-validator';
import { setValue, getValue } from './redis.js';



export const getPosts = async (req, res) => {
    try {
        const cacheKey = "all_posts";

        // 1️⃣ Check Redis cache
        const cachedPosts = await getValue(cacheKey);

        if (cachedPosts) {
            return res.status(200).json({
                source: "redis",
                posts: cachedPosts
            });
        }

        // 2️⃣ If not cached → fetch from Mongo
        const posts = await Post.find().select("_id title content");

        // 3️⃣ Save Mongo result to Redis
        await setValue(cacheKey, posts);

        // 4️⃣ Return response
        return res.status(200).json({
            source: "mongo",
            posts: posts
        });

    } catch (err) {
        console.error("Error in getPosts:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getById = async (req,res)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).select("_id title content");


        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            post
        });
        
    } catch (error) {
        
        console.error("Error in getById:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
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