/**
 * Created by HANG on 11/5/2016.
 */
import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import user from '../models/users';
//import bcrypt from 'bcrypt';
let router=express.Router();

function validateInput(data){
    let errors={};
    if(Validator.isEmpty(data.username)){
        errors.username='This field is required';
    }
    if(Validator.isEmpty(data.email)){
        errors.email='This field is required';
    }else {
        if (!Validator.isEmail(data.email)) {
            errors.email = 'Email is invalid';
        }
    }
    if(Validator.isEmpty(data.password)){
        errors.password='This field is required';
    }
    if(Validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation='This field is required';
    }
    if(!Validator.equals(data.password,data.passwordConfirmation)){
        errors.passwordConfirmation='password does not match';
    }

    return errors;

}

router.post('/',(req,res)=>{
    let data=req.body;
    let errors=validateInput(data);

    return user.find({$or: [{username: data.username}, {email: data.email}]}).then((users)=> {
        users.map((user)=> {
            if (user.username === data.username) {
                errors.username = 'This username is registered';
            }
            if (user.email === data.email) {
                errors.email = 'This email is registered';
            }
        })
        if(isEmpty(errors)){
            const {username,email,password}=data;
            //const password_digest=bcrypt.hashSync(password,10);
            return user.create({username:username,email:email,password:password})
                    .then(()=>{
                        return user.findOne({username:username});
                    })
                    .then((user)=> {
                        req.session.user = {userId:user._id,username:user.username};
                        res.json(user.username);
                    })


        }else{
            res.status(400).json(errors);
        }
        }).catch((e)=>{
        console.log(e);
    });

});

export default router;