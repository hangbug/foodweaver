/**
 * Created by HANG on 10/26/2016.
 */
import React from 'react';
import Navbars from './Navbars';

const Header=React.createClass({
    render(){
        return(
            <header>
                <Navbars></Navbars>
            </header>
        );
    }
});
export default Header;