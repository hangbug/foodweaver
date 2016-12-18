/**
 * Created by HANG on 12/9/2016.
 */
import users from '../models/users';

export default (req,res,next)=>{
    const postId=req.params.id;
    const {userId}=req.session.user;
    return users.findOne({_id:userId},{likes:{$elemMatch:{$eq:postId}}}).then((value)=>{
        if(value.likes.length){
            return users.update({_id:userId},{$pull:{likes:postId}}).then(()=>{
                next();
            })
        }else{
            res.status(409).json({error:'you do not have  liked this'});
        }
    }).catch((e)=>{
        console.log(e);
    })
}