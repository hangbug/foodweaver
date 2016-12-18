/**
 * Created by HANG on 11/6/2016.
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bookmark:{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[]
    },
    create_date:{type:Date,default:Date.now()}
},{collection:'users'});

export default mongoose.model('users', userSchema);


