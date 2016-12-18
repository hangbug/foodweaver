/**
 * Created by HANG on 11/25/2016.
 */
import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {incrementLikes} from './../../actions/incrementLikes'
import {deleteBookMark} from './../../actions/bookmark';
import {connect} from 'react-redux';

const BookMarkPost=React.createClass({
    deleteToggle(postId){
        return this.props.deleteBookMark(postId);
    },
    render:function(){
        const {post}=this.props;
        return(
            <div className="grid-post-wrap col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <figure>
                    <Link to={"/view/"+post._id}>
                        <img src={post.display_src} alt="no image" className="grid-photo"/>
                    </Link>
                    <figcaption className="post-figure">
                        <Link to={"/view/"+post._id} style={{textDecoration : 'none'}}><h3 className="post-title">{post.title}</h3></Link>
                        <Link to={"/view/"+post._id} style={{textDecoration : 'none'}}><p className="post-description">{post.description}</p></Link>
                        <ul className="control-button">
                            <li className="like-button-wrap">
                                <div className="like-number">{post.likes+' likes'}</div>
                            </li>
                            <li className="bookmark">
                                <button className="savebutton" onClick={()=>this.deleteToggle(post._id)}>delete</button>
                            </li>
                        </ul>
                    </figcaption>
                </figure>
            </div>
        );
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        incrementLikes:incrementLikes,
        deleteBookMark:deleteBookMark
    },dispatch);
}
export default connect(null,mapDispatchToProps)(BookMarkPost);