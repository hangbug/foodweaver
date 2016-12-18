/**
 * Created by HANG on 11/11/2016.
 */
import users from '../models/users';

export default (req,res,next)=>{
    if(req.session&&req.session.user){
        const {userId}=req.session.user;
        users.findById(userId).then((user)=>{
            if(!user){
                res.status(403).json({error:'No authenticated'});
            }else {
                next();
            }
        })
    }else{
        res.status(403).json({
                error:'No authenticated'
        });
    }
}
