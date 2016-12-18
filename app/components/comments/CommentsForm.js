/**
 * Created by HANG on 11/20/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {uploadComment} from './../../actions/commentActions';


const CommentsForm=React.createClass({
    renderComment(comment,i){
        return(
            <div className="comment-items-wrap" key={i}>
                <div className="comment-item" >
                    <strong className="author">{'@'+comment.author}</strong>
                    {comment.text}
                    <span className="comment-date">{comment.comment_date}</span>
                </div>
            </div>
        )
    },
    onSubmit(e){
        e.preventDefault();
        const postId=this.props.postId;
        const comment=this.refs.text.value;
        if(comment!=='') {
            this.props.uploadComment(postId, comment);
        }
        this.refs.commentForm.reset();
    },
    render(){
        return(
            <div className="comment">
                <div className="row comment-header">
                    <h2>Comments</h2>
                </div>
                {this.props.postComments.map(this.renderComment)}
                <div className="row">
                    <div className="col-md-12">
                        <div className="widget-area no-padding blank">
                            <div className="status-upload">
                                <form ref="commentForm" onSubmit={this.onSubmit}>
                                    <textarea ref='text'placeholder="Write a comment" ></textarea>
                                    <button type="submit" className="btn btn-success green">Post</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        uploadComment:uploadComment
    },dispatch);
}
export default connect(null,mapDispatchToProps)(CommentsForm);