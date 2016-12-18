/**
 * Created by HANG on 11/25/2016.
 */
import axios from 'axios';
import {updateLikeIcon} from './updateLikeIcon';

function search(searchResult){//action to fresh searchPosts result reducer
    return{
        type:'SEARCH',
        searchResult
    }
}

export function loadSearchResult(item){
    return dispatch=> {
        return axios.put('/search/' + item).then((res)=> {//get the search result from server
                    dispatch(search(res.data));
                    dispatch(updateLikeIcon());
                })
    }
}