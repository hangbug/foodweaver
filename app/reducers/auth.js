/**
 * Created by HANG on 11/10/2016.
 */
import isEmpty from 'lodash/isEmpty';

const initialState={
    iaAuthenticated:false,
    user:{}

};
export default function auth(state=initialState,action){
    switch (action.type){
        case 'SET_CURRENT_USER':
            return {
                isAuthenticated: !isEmpty(action.user),
                user:action.user
            }

        default:return state;
    }
}