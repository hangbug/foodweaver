/**
 * Created by HANG on 11/11/2016.
 */
import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    display_src:{
        type:String,
        required:true
    },
    steps:{
        type:[String],
        default:[]
    },
    ingredients:{
        type:[String],
        default:[]
    },
    likes:{
        type:Number,
        default:0
    },
    likePositive:{
        type:Number,
        default:0
    },
    comments:{
        type:[{
            author:String,
            text:String,
            comment_date:{type:Date,default:Date.now()}
        }],
        default:[]
    },
    create_date:{type:Date,default:Date.now()}
},{collection:'posts'});

export default mongoose.model('posts', postsSchema);
