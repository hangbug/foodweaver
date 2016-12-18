/**
 * Created by HANG on 10/28/2016.
 */
import React from 'react';
import PostGrid from './../home/PostGrid'
import {connect} from 'react-redux';
import LogoSession from '../home/LogoSession';

const CategoryPosts=React.createClass({
    render(){
        return(
            <div className="content-wrap">
                <LogoSession/>
                <PostGrid posts={this.props.categoryPost}></PostGrid>
            </div>
        );
    }
});
function mapStateToProps(state) {
    return{
        categoryPost:state.categoryPost
    }
}

export default connect(mapStateToProps)(CategoryPosts);