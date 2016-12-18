/**
 * Created by HANG on 11/16/2016.
 */
import express from 'express';
import posts from '../models/posts';

let router=express.Router();
router.post('/',(req,res)=>{
    const {count}=req.body;
    return posts.count().then((sum)=>{
        if(count*8+8<sum){
            return posts.find({},{'title':1,'description':1,'display_src':1,'likes':1,'likePositive':1})
                    .sort({'likes':-1})
                    .skip(count*8)
                    .limit(8)
                    .then((data)=>{
                        res.json({
                            posts:data,
                            showLoadMore:true
                        })
                    })
        }else{
            if(count*8+8>sum) {
                return posts.find({}, {'title': 1, 'description': 1, 'display_src': 1, 'likes': 1, 'likePositive': 1})
                    .sort({'likes': -1})
                    .skip(count * 8)
                    .limit(sum-count * 8)
                    .then((data)=>{
                        res.json({
                            posts:data,
                            showLoadMore:false
                        })
                    })
            }else{
                res.json({
                    posts:[],
                    showLoadMore:false
                })
            }
        }
    }).catch((e)=>{
        console.log(e);
    });
});

export default router;