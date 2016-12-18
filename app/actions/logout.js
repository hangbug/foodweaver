/**
 * Created by HANG on 11/10/2016.
 */

import {setCurrentUser} from './setCurrentUser';
import {removeLikeIcon} from './updateLikeIcon';
import {browserHistory} from 'react-router';
import axios from 'axios';

export function logout(){
    return dispatch=>{
        localStorage.removeItem('token');
        dispatch(removeLikeIcon());
        dispatch(setCurrentUser({}));
        browserHistory.push('/');
        return axios.post('/logout').catch((e)=>{
                console.log(e);
            })
    }
}