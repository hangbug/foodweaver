/**
 * Created by HANG on 11/8/2016.
 */
import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import {browserHistory} from 'react-router';
import {login} from '../../actions/loginActions';

const LoginForm=React.createClass({
    getInitialState(){
        return{
            identifier:'',
            password:'',
            errors:{},
            isLoading:false
        };
    },
    onSubmit(e){
        this.setState({errors:{},isLoading:true});
        e.preventDefault();
        this.props.login(this.state)
            .then(
                ()=>{browserHistory.push('/');},
                (err)=>{
                    this.setState({errors:err.response.data.errors,isLoading:false});
                }
            )
    },
    onchange(e){
        this.setState({[e.target.name]:e.target.value});
    },
    render(){
        const {errors,identifier,password}=this.state;
        return(
            <div className="signin-wrapper">
            <form onSubmit={this.onSubmit} className="form-signin">
                <h3 className="form-signin-heading">Login</h3>
                {errors.form&&<div className="alert alert-danger">{errors.form}</div>}
                <div className={classnames("form-group",{'has-error':errors.identifier})}>
                    <label className="control-label">Username</label>
                    <input
                        className="form-control"
                        name="identifier"
                        label="Username / Email"
                        value={identifier}
                        onChange={this.onchange}
                        type="text"
                    />
                    {errors.identifier&&<span className="help-block">{errors.identifier}</span>}
                </div>
                <div className={classnames("form-group",{'has-error':errors.password})}>
                    <label className="control-label">Passsword</label>
                    <input
                        className="form-control"
                        name="password"
                        label="password"
                        value={password}
                        onChange={this.onchange}
                        type="password"
                    />
                    {errors.password&&<span className="help-block">{errors.password}</span>}
                </div>
                <div disabled={this.state.isLoading} className="form-group">
                    <button className="btn btn-lg btn-primary btn-block">
                        Login
                    </button>
                </div>
            </form>
            </div>
        );
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login:login
    },dispatch);
}
export default connect(null,mapDispatchToProps)(LoginForm);