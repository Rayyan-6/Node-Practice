import mongoose from "mongoose";


const postSchema= new mongoose.Schema({
    title:{
        type: String
    },
    content:{
        type: String
    }

})