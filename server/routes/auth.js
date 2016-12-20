/**
 * Created by HANG on 11/8/2016.
 */
import express from 'express';
import user from '../models/users';
import crypto from 'crypto';

let router=express.Router();

router.post('/',(req,res)=>{
    const {identifier,password}=req.body;
    return user.findOne({$or:[{username:identifier},{email:identifier}]}).then((user)=>{
            if(user){
                const secret = 'hangbug';
                let decipher = crypto.createDecipher('aes192', secret);
                let dec = decipher.update(user.password,'hex','utf8');
                dec += decipher.final('utf8');
                if(dec===password){
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
