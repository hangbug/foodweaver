/**
 * Created by HANG on 11/16/2016.
 */
import axios from 'axios';
function loadMorePosts(data) {
    return{
        type:'LOAD_MORE',
        data
    }

}
function hideLoadMore() {
    return{
        type:'HIDE_LOADMORE'
    }
}
export function loadMore(count){
    return (dispatch)=>{
        return axios.post('/api/loadMore',{count:count}).then((res)=>{
            if(res.data.posts.length!==0){
                dispatch(loadMorePosts(res.data.posts));
            }
            if(!res.data.showLoadMore) {
                dispatch(hideLoadMore());
            }
        }).catch((e)=>{
            console.log(e);
        });
    }
}