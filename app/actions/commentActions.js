/**
 * Created by HANG on 11/21/2016.
 */
import axios from 'axios';
import {browserHistory} from 'react-router';

export function setComments(data) {//set the comments reducer
    return {
        type:'LOAD_COMMENTS',
        data
    }
}
export function loadComments(postId) {//load comments from server
    return axios.get('http://52.91.32.102:9000/api/comments/'+postId);
}

export function addComment(author,comment){//add comment to reducer
    return{
        type:'ADD_COMMENTS',
        author,
        comment
    }
}
export function deleteComment(author,comment){//delete comment from reducer
    return{
        type:'DELETE_COMMENTS',
        author,
        comment
    }
}
export function uploadComment(postId,comment){//add the comment to server
    return dispatch=>{
        return axios.put('/addComment/'+postId,{comment}).then(
                (res)=>{
                    const author=res.data;
                    dispatch(addComment(author,comment));
                },
                ()=>{
                    browserHistory.push('/login');
                }
                ).catch((e)=>{
                    console.log(e);
                })

    }
}