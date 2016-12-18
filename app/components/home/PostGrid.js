/**
 * Created by HANG on 10/14/2016.
 */
import React from 'react';
import Post from './Post';

const PostGrid=React.createClass({
    render(){
        let showPosts = this.props.posts;
        let gridContent = showPosts.map((post, i)=> {
            return (<Post key={i} post={post}/>);
        });
        return(
                <div id="posts-content">
                    <div id="grid" className="row fluid">
                    {gridContent}
                    </div>
                </div>
        )

    }
});

export default PostGrid;