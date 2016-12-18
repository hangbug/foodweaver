/**
 * Created by HANG on 11/4/2016.
 */
import React from 'react';
import SignupForm from './SignupForm';

const SignupPage=React.createClass({
    render(){
        return(
            <div className="row signup">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm/>
                </div>
            </div>
        );
    }
});
export default SignupPage;
