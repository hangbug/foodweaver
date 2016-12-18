/**
 * Created by HANG on 10/12/2016.
 */
import React from 'react';
import {Route,IndexRoute} from 'react-router';
import CategoryPosts from "./components/category/CategoryPost";
import Home from "./components/home/Home";
import AllPosts from "./components/home/AllPosts";
import PostDetail from "./components/postDetail/PostDetail";
import SignupPage from "./components/signUpPage/SignupPage";
import LoginPage from "./components/LoginPage/LoginPage";
import BookMarkPage from "./components/bookMarks/BookMarkPage";
import SearchPage from "./components/searchPage/SearchPage";
import ContactForm from "./components/contactPage/ContactForm";
const routes = (
    <Route path="/" component={Home}>
        <IndexRoute component={AllPosts}></IndexRoute>
        <Route path="/view/:postId" component={PostDetail}></Route>
        <Route path="/category/:item" component={CategoryPosts}></Route>
        <Route path="/search/:item" component={SearchPage}></Route>
        <Route path="/signup" component={SignupPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/bookmark" component={BookMarkPage}></Route>
        <Route path="/contact" components={ContactForm}></Route>
    </Route>
);

export default routes;
