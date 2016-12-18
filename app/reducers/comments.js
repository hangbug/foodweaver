/**
 * Created by HANG on 11/21/2016.
 */
export default function comments(state=[],action) {
    switch (action.type){
        case 'LOAD_COMMENTS':
            return action.data;
        case 'ADD_COMMENTS':
            return [
                ...state,
                {
                    author:action.author,
                    text:action.comment
                }
            ]
        default:
            return state;
    }
}