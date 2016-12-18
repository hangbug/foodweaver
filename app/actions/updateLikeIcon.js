/**
 * Created by HANG on 12/6/2016.
 */
import axios from 'axios';

function setLikeIcon(userLikes){
    return{
        type:'LIKE_ICON',
        userLikes
    }
}
export function removeLikeIcon(){
    return{
        type:'REMOVE_LIKE_ICON'
    }
}
export function updateLikeIcon() {
    return dispatch=>{
        return axios.get('/loadUserLikes').then((res)=>{
            if(res.data) {
                dispatch(setLikeIcon(res.data));
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
}