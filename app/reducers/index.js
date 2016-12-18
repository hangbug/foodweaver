/**
 * Created by HANG on 10/14/2016.
 */
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import posts from './posts';
import categoryPost from './categoryPost';
import auth from './auth';
import loadMore from './loadMore';
import selectedPost from './selectedPost';
import comments from './comments';
import bookMarks from './bookMarks';
import searchPosts from './searchPosts';

const rootReducer = combineReducers({
    posts:posts,
    selectedPost:selectedPost,
    categoryPost:categoryPost,
    auth:auth,
    loadMore:loadMore,
    comments:comments,
    bookMarks:bookMarks,
    searchPosts:searchPosts,
    routing:routerReducer
});

export default rootReducer;
