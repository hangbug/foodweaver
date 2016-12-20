/**
 * Created by HANG on 11/14/2016.
 */
import axios from 'axios';
import {loadComments,setComments} from './commentActions';

function setSelectPost(post) {
    return {
        type:'SELECT_POST',
        post
    }
}
export function selectPost(postId){
    return dispatch=>{
        const commentId=postId;
        return axios.get('/post/'+postId).then((res)=>{
                    return dispatch(setSelectPost(res.data));
                }).then(()=>{
                    return loadComments(commentId);
                }).then((res)=>{
                    return dispatch(setComments(res.data));
                }).catch((e)=>{
                    console.log(e);
                });
    }
}