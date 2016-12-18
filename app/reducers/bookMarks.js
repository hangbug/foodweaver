/**
 * Created by HANG on 11/23/2016.
 */


export default function bookMarks(state=[],action){
    switch (action.type){
        case 'BOOK_MARK':
            return action.bookedPosts;
        case 'DELETE_BOOKMARK':
            let bookmarkId=action.postId;
            let index=state.findIndex((post)=>post._id===bookmarkId);
            return [
                ...state.slice(0,index),
                ...state.slice(index+1)
            ]
        default:
            return state;
    }
}