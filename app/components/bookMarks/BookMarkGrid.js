/**
 * Created by HANG on 11/25/2016.
 */
import React from 'react';
import BookMarkPost from './BookMarkPost';


const BookMarkGrid=React.createClass({
    render(){
        let showPosts = this.props.posts;
        let gridContent = showPosts.map((post, i)=> {
            return (<BookMarkPost key={i} post={post}/>);
        });
        return(
            <div id="posts-content">
                <div id="grid">
                    {gridContent}
                </div>
            </div>
        )

    }
});

export default BookMarkGrid;