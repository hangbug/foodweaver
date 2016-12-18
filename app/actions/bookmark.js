/**
 * Created by HANG on 11/16/2016.
 */
import axios from 'axios';
import {browserHistory} from 'react-router';

function bookmark(bookedPosts) {//set the state of bookmark action
    return{
        type:'BOOK_MARK',
        bookedPosts
    }
}
function deleteBook(postId) {//delete the post from bookmark action
    return{
        type:'DELETE_BOOKMARK',
        postId
    }
}
export function loadBookMarks() {//load booked posts for user from server
    return dispatch=> {
        return axios.put('/bookmark').then(
            (res)=> {
                dispatch(bookmark(res.data));
            },
            ()=>{
                browserHistory.push('/login');
            }
            )
    }
}
export function deleteBookMark(postId){
    return dispatch=>{
        let bookmarkId=postId;
        return axios.put('/deleteBookMark/'+bookmarkId).then(
            ()=>{
                dispatch(deleteBook(bookmarkId));
            },
            ()=>{
                browserHistory.push('/login');
            }
        ).catch((e)=>{
            console.log(e);
        })
    }
}

