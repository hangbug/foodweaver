/**
 * Created by HANG on 11/4/2016.
 */
import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import {browserHistory} from 'react-router';
import {userSignupRequest} from '../../actions/signupActions';

const SignupForm=React.createClass({
    getInitialState(){
        return{
            username:'',
            email:'',
            password:'',
            passwordConfirmation:'',
            errors:{},
            isLoading:false
        }
    },
    onchange(e){
        this.setState({[e.target.name]:e.target.value});
    },
    onSubmit(e){
        this.setState({errors:{},isLoading:true});
        e.preventDefault();
        this.props.userSignupRequest(this.state)
            .then(
                ()=>{
                    browserHistory.push('/');
                },
                (err)=>{this.setState({errors:err.response.data,isLoading:false});}
            )
    },
    render(){
        const {errors}=this.state;
        return (
            <div className="signup-wrapper">
                <form onSubmit={this.onSubmit} className="form-signup">
                    <h3 className="form-signup-heading">Join in FoodWeaver</h3>
                    <div className={classnames("form-group",{'has-error':errors.username})}>
                        <label className="control-label">Username</label>
                        <input
                            value={this.state.username}
                            type="text"
                            name="username"
                            className="form-control"
                            onChange={this.onchange}
                        />
                        {errors.username&&<span className="help-block">{errors.username}</span>}
                    </div>
                    <div className={classnames("form-group",{'has-error':errors.email})}>
                        <label className="control-label">Email</label>
                        <input
                            value={this.state.email}
                            type="text"
                            name="email"
                            className="form-control"
                            onChange={this.onchange}
                        />
                        {errors.email&&<span className="help-block">{errors.email}</span>}
                    </div>
                    <div className={classnames("form-group",{'has-error':errors.password})}>
                        <label className="control-label">Password</label>
                        <input
                            value={this.state.password}
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={this.onchange}
                        />
                        {errors.password&&<span className="help-block">{errors.password}</span>}
                    </div>
                    <div className={classnames("form-group",{'has-error':errors.passwordConfirmation})}>
                        <label className="control-label">Password Confirmation</label>
                        <input
                            value={this.state.passwordConfirmation}
                            type="password"
                            name="passwordConfirmation"
                            className="form-control"
                            onChange={this.onchange}
                        />
                        {errors.passwordConfirmation&&<span className="help-block">{errors.passwordConfirmation}</span>}
                    </div>
                    <div disabled={this.state.isLoading} className="form-group">
                        <button className="btn btn-primary btn-lg btn-block">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        userSignupRequest:userSignupRequest,
    },dispatch);
}
export default connect(null,mapDispatchToProps)(SignupForm);