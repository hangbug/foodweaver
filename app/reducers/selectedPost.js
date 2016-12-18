/**
 * Created by HANG on 11/14/2016.
 */

const initialState={
    title: "",
    display_src:"",
    description: "",
    ingredients: [],
    steps: [],
    likes:0

};
export default function selectedPost(state=initialState,action){
    switch (action.type){
        case 'SELECT_POST':
            return action.post;

        default:return state;
    }
}