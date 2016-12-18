/**
 * Created by HANG on 12/6/2016.
 */
import users from '../models/users';

export default (req,res,next)=>{
    if(req.session&&req.session.user){
        const {userId}=req.session.user;
        users.findById(userId).then((user)=>{
            if(!user){
                res.status(204).json();
            }else {
                next();
            }
        })
    }else{
        res.status(204).json();
    }
}