/**
 * Created by HANG on 11/16/2016.
 */
import express from 'express';
import posts from '../models/posts';
let router=express.Router();
router.put('/',(req,res)=>{
    return posts.find({title:{$regex:req.body.item,$options:'i'}},{title:1,description:1,display_src:1,likes:1,likePositive:1}).then((data)=>{
        res.status(201).json(data);
    }).catch((e)=>{
        console.log(e);
    })
});

export default router;