/**
 * Created by HANG on 10/24/2016.
 */
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {logout} from '../../actions/logout';
import {bindActionCreators} from 'redux';
import {loadSearchResult} from '../../actions/searchAction';

const Navbars=React.createClass({
    logout(e){
        e.preventDefault();
        this.props.logout();
    },
    bookMarks(e){
        e.preventDefault();
        browserHistory.push('/bookmark');
    },
    submit(e){
        e.preventDefault();
        let searchText=this.refs.searchText.value;
        if(searchText!=='') {
            return this.props.loadSearchResult(searchText).then(()=>{
                browserHistory.push('/search/'+searchText);
            }).catch((e)=>{
                console.log(e);
            })
        }
    },
    render(){
        const {isAuthenticated,user}=this.props.auth;
        const userLinks=(
            <ul className="nav navbar-nav navbar-right">
                <li><a className="profile"  onClick={this.bookMarks}>Collections</a></li>
                <li><Link>{'Hi  '+user}</Link></li>
                <li><a className="sign-out" onClick={this.logout}>Logout</a></li>
            </ul>
        );
        const guestLinks=(
            <ul className="nav navbar-nav navbar-right">
                <li><Link className="sign-in" to="/login">Sign in</Link></li>
                <li><Link className="sign-up" to="/signup">Sign up</Link></li>
            </ul>
        );
        return(
            <nav className="navbar navbar-default navbar-fixed-top" >
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to='/' style={{height:50,width:100,padding: "5px 8px"}}><img style={{height:'100%',width:'100%'}} src="http://localhost:3000/images/brand.png"alt="no img"/></Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                        <form className="navbar-form navbar-left" onSubmit={this.submit}>
                            <div className="form-group">
                                <input ref="searchText" type="text" className="form-control" placeholder="Search"/>
                            </div>
                            <button type="submit" className="btn btn-default">Search</button>
                        </form>
                        {isAuthenticated ? userLinks :guestLinks}
                    </div>
                </div>
            </nav>

    );
    }
});


function mapStateToProps(state) {
    return{
        auth:state.auth
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout:logout,
        loadSearchResult:loadSearchResult
    },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbars);