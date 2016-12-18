/**
 * Created by HANG on 10/28/2016.
 */

export default function categoryPost(state=[],action){
    switch (action.type){
        case 'SET_CATEGORY':
            return action.data;
        case 'ADD_LIKES':
            const postId=action.postId;
            const i=state.findIndex((post)=>post._id===postId);
            if(i!==-1) {
                return [
                    ...state.slice(0, i),
                    {...state[i], likes: state[i].likes + 1,likePositive:1},
                    ...state.slice(i + 1)
                ];
            }
            return state;
        case 'DECR_LIKES':
            const decrPostId=action.postId;
            const j=state.findIndex((post)=>post._id===decrPostId);
            if(j!==-1&&state[j].likes>0) {
                return [
                    ...state.slice(0, j),
                    {...state[j], likes: state[j].likes - 1,likePositive:0},
                    ...state.slice(j + 1)
                ];
            }
            return state;
        case 'REMOVE_LIKE_ICON':
            return state.map((item)=>{
                item={...item,likePositive:0};
                return item;
            });
        case 'LIKE_ICON':
            const userLikesId=action.userLikes;
            let newPosts=[...state];
            userLikesId.forEach((id)=>{
                let i=state.findIndex((post)=>post._id===id);
                if(i!==-1){
                    newPosts[i]={
                        ...newPosts[i],
                        likePositive:1
                    };
                }
            });
            return newPosts;
        default:
            return state;
    }
}