/**
 * Created by HANG on 11/8/2016.
 */
import express from 'express';
import user from '../models/users';

let router=express.Router();

router.post('/',(req,res)=>{
    const {identifier,password}=req.body;
    return user.findOne({$or:[{username:identifier},{email:identifier}]}).then((user)=>{
            if(user){
                if(user.password===password){
                    req.session.user={userId:user._id,username:user.username};
                    res.json(user.username);
                }else{
                    res.status(401).json({errors:{form:'Password is not correct'}});
                }
            }else{
                res.status(401).json({errors:{form:'The user does not exists'}});
            }
        }).catch((e)=>{
            console.log(e);
        });
});

export default router;
