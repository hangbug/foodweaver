/**
 * Created by HANG on 11/8/2016.
 */
import React from 'react';
import LoginForm from './LoginForm';

const LoginPage=React.createClass({

    render(){
        return(
            <div className="row login">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm/>
                </div>
            </div>
        )
    }
});
export default LoginPage;