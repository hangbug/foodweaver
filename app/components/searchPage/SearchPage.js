/**
 * Created by HANG on 11/25/2016.
 */
import React from 'react';
import PostGrid from '../home/PostGrid';
import {connect} from 'react-redux';
import {loadSearchResult} from '../../actions/searchAction';
import {bindActionCreators} from 'redux';

const SearchPage=React.createClass({
    componentWillMount(){
        let searchText=this.props.params.item;
        if(this.props.posts.length===0) {
            return this.props.loadSearchResult(searchText).catch((e)=> {
                console.log(e);
            });
        }
    },
    render(){
        return(
            <div className="search-wrap">
                <div className="result-header">
                    <h2>Results for <span className="search-text">{'"'+this.props.params.item+'"'}</span></h2>
                </div>
                <div className="content-wrap">
                    <PostGrid posts={this.props.posts}></PostGrid>
                </div>
            </div>
        );
    }
});
function mapStateToProps(state) {
    return{
        posts:state.searchPosts
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadSearchResult:loadSearchResult
    },dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchPage);