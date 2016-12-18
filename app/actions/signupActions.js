/**
 * Created by HANG on 11/4/2016.
 */

import axios from 'axios';
import {setCurrentUser} from './setCurrentUser';

export function userSignupRequest(userData) {
    return dispatch=> {
        return axios.post('/api/users', userData)
            .then((res)=> {
                const token = res.data;
                localStorage.setItem('token', token);
                dispatch(setCurrentUser(token));
            });

    }
}