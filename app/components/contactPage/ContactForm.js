/**
 * Created by HANG on 12/13/2016.
 */

import React from 'react';

const ContactForm=React.createClass({
    render(){
        return(
            <div className="about row fluid">
                <h1>HANG ZHANG</h1>
                <div className="autor-photo col-md-4">
                    <img src="http://localhost:3000/images/hang.jpg" alt="no image"/>
                </div>
                <div className="introduction col-md-8">
                    <p>My name is Hang Zhang. A web application designer specialise in creating beautiful usable professional Singal Page Applications
                        using best practice accessibility and the latest Front-end and Back-end technologies. All my application is lovingly hand coded
                    </p>
                    <ul>
                        <li>Coding in Javascript, JSX, React.js, Redux.js, Node.js, Express.js</li>
                        <li>Development on Web application using  HTML5, CSS3, SASS,Responsive Design</li>
                        <li>Designed and developed Node.js Application using Single Page Application Architecture.</li>
                        <li>Build various RESTful API in appliction</li>
                        <li>Worked on Redis for the cache and NoSQL database mongodb</li>
                    </ul>
                    <br/>
                    <span style={{fontWeight:'bold'}}>Email: hzhang37@stevens.edu</span>

                </div>
            </div>
        )
    }
});

export default ContactForm;