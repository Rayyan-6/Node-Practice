import mongoose from "mongoose";


const postSchema= new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        minlength: [4,'need atleast 4 characters'],
        maxlength: [50,'cannot exceed 50 characters']
    },
    content:{
        type: String,
        minlength: [4,'need atleast 4 characters'],
        required: [true, 'Body is required']
    }

})

export default mongoose.model("Post", postSchema);