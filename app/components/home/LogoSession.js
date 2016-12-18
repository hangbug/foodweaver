/**
 * Created by HANG on 10/27/2016.
 */
import React from 'react';
import {requestCategory} from '../../actions/requestCategory';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



const LogoSession=React.createClass({
    select(item){
        this.props.requestCategory(item);
    },
    render(){
        return(
            <div>
                <div className="logo-session">
                    <div className="site-title"><img style={{height:'100%',width:'100%'}} src="http://localhost:3000/images/logo.jpeg"/></div>
                </div>
                <nav className="menu-nav navbar navbar-default">
                    <div className="container-fluid">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav nav-tabs">
                                <li role='presentation'><a onClick={()=>{this.select('salad')}}>Salads</a></li>
                                <li role='presentation'><a onClick={()=>{this.select('coffee')}}>Coffee</a></li>
                                <li role='presentation'><a onClick={()=>{this.select('dessert')}}>Desserts</a></li>
                                <li role='presentation'><a onClick={()=>{this.select('breakfast')}}>Breakfast</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return{
        posts:state.posts
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        requestCategory:requestCategory
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LogoSession);