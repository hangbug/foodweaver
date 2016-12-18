/**
 * Created by HANG on 10/14/2016.
 */
import React from 'react';
import Header from './Header';
import Footer from './Footer';
const Home=React.createClass({
    render(){
        return(
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        )

    }
});

export default Home;
