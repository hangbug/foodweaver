/**
 * Created by HANG on 11/8/2016.
 */

import axios from 'axios';
import {setCurrentUser} from './setCurrentUser';
import {updateLikeIcon} from './updateLikeIcon';

export function login(data) {
    return dispatch=>{
        return axios.post('/api/auth',data)
            .then((res)=>{
            const token=res.data;
            localStorage.setItem('token', token);
            dispatch(setCurrentUser(token));
            dispatch(updateLikeIcon());
        });
    }
}