/**
 * Created by HANG on 10/28/2016.
 */
import {browserHistory} from 'react-router';
import axios from 'axios';
import {updateLikeIcon} from './updateLikeIcon';

function setCategory(data) {
    return{
        type:'SET_CATEGORY',
        data
    }
}
export function requestCategory(item){
    return (dispatch)=>{
        return axios.put('/api/category',{item:item}).then((res)=>{
                    dispatch(setCategory(res.data));
                    dispatch(updateLikeIcon());
                }).then(()=>{
                    browserHistory.push('/category/'+item);
                }).catch((e)=>{
                    console.log(e);
                });

    }
}
