/**
 * Created by HANG on 12/9/2016.
 */
import axios from 'axios';

function decrlikes(postId) {//the decrlike action to reducer
    return{
        type:'DECR_LIKES',
        postId
    }
}
export function decrementLikes(postId) {
    return (dispatch)=> {
        const id=postId;
        return axios.post('/decrLike/' + postId).then(()=>{
            return dispatch(decrlikes(id));
        }).catch((e)=>{
            console.log(e);
        })
    }
}