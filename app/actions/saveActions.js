/**
 * Created by HANG on 11/23/2016.
 */
import axios from 'axios';

export function save(postId) {
    return dispatch=>{
        return axios.put('/save/'+postId);
    }

}