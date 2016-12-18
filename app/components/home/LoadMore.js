/**
 * Created by HANG on 11/16/2016.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {loadMore} from './../../actions/loadMore'
import {connect} from 'react-redux';

const LoadMore=React.createClass({
    getInitialState(){
        return{
            count:1
        }
    },
    showMore(e){
        e.preventDefault();
        this.props.loadMore(this.state.count).then(()=>{
           this.setState({count:this.state.count++});
        }).catch((e)=>{
            console.log(e);
        })
    },
    render(){
        const loadMore=(<a className="clicker" onClick={this.showMore}>Load more</a>);
        return(
            <div className="load-more">
            {this.props.showLoadMore.show ? loadMore :(<div></div>)}
            </div>
        )

    }
});
function mapStateToProps(state) {
    return{
        showLoadMore:state.loadMore
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadMore:loadMore,
    },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(LoadMore);