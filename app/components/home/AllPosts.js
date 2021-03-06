/**
 * Created by HANG on 10/28/2016.
 */
import React from 'react';
import PostGrid from './PostGrid'
import {connect} from 'react-redux';
import LogoSession from './LogoSession';
import LoadMore from './LoadMore';

const AllPosts=React.createClass({
    render(){
        return(
            <div className="content-wrap">
                <LogoSession/>
                <PostGrid posts={this.props.posts}></PostGrid>
                <LoadMore/>
            </div>
        );
    }
});
function mapStateToProps(state){
    return{
        posts:state.posts
    }
}

export default connect(mapStateToProps)(AllPosts);