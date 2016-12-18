/**
 * Created by HANG on 11/16/2016.
 */
import axios from 'axios';
function addlikes(postId) {//the addlike action to reducer
    return{
        type:'ADD_LIKES',
        postId
    }
}
export function incrementLikes(postId) {
    return (dispatch)=> {
        const id=postId;
        return axios.post('/addlike/' + postId).then(()=>{
            return dispatch(addlikes(id));
        })
    }
}