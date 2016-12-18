/**
 * Created by HANG on 11/11/2016.
 */
import React from 'react';
import BookMarkGrid from './BookMarkGrid'
import {connect} from 'react-redux';
import {loadBookMarks} from '../../actions/bookmark';
import {bindActionCreators} from 'redux';

const BookMarkPage=React.createClass({
    componentWillMount(){
        return this.props.loadBookMarks();
    },
    render(){
        return(
            <div className="bookmark-wrap">
                <div className="bookmark-header">
                    <h2>The recipes you have saved</h2>
                </div>
                <div className="content-wrap">
                    <BookMarkGrid posts={this.props.posts}/>
                </div>
            </div>
        )
    }
});
function mapStateToProps(state) {
    return{
        posts:state.bookMarks
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadBookMarks:loadBookMarks
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(BookMarkPage);