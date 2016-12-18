/**
 * Created by HANG on 12/12/2016.
 */
const initialState={
    show:true
};
export default function loadMore(state=initialState,action){
    switch (action.type){
        case 'HIDE_LOADMORE':
            return {
                show:false
            };
        default:return state;
    }
}