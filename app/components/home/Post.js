/**
 * Created by HANG on 10/15/2016.
 */
"use strict"
import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {incrementLikes} from './../../actions/incrementLikes';
import {decrementLikes} from './../../actions/decrementLikes';
import {save} from './../../actions/saveActions';
import {connect} from 'react-redux';
import LoginFormModal from '../modal/LoginFormModal';
import SignupFormModal from '../modal/SignupFormModal';
import {Modal,Button,Tab,Tabs} from 'react-bootstrap';

const Post=React.createClass({
    getInitialState(){
        return{
            authModal:false,
            alertModal:{
                toggle:false,
                text:''
            }
        }
    },
    toggle(val){
        this.setState(val);
    },
    close() {
        this.setState({
            authModal:false,
            alertModal:{
                toggle:false,
                text:''
            }
        });
    },
    saveToggle(postId){
        return this.props.save(postId).then(
                    ()=>{},
                    (err)=>{
                        const code=err.response.status;
                        if(code===403){
                            this.setState({
                                authModal:true
                            });
                        }else if(code===409) {
                            this.setState({
                                alertModal:{
                                    toggle:true,
                                    text:err.response.data.error
                                }
                            });
                        }
                    })
    },
    incrLikes(postId){
        return this.props.incrementLikes(postId).then(
            ()=>{},
            (err)=>{
                this.setState({
                    authModal:true
                });
            })
    },
    decrLikes(postId){
        return this.props.decrementLikes(postId);
    },
    render:function(){
        const {post}=this.props;
        return(
            <div className="grid-post-wrap col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <figure>
                    <Link to={"/view/"+post._id}>
                        <img src={post.display_src} alt="no image" className="grid-photo"/>
                    </Link>
                    <figcaption className="post-figure">
                        <Link to={"/view/"+post._id} style={{textDecoration : 'none'}}><h3 className="post-title">{post.title}</h3></Link>
                        <Link to={"/view/"+post._id} style={{textDecoration : 'none'}}><p className="post-description">{post.description}</p></Link>
                        <ul className="control-button">
                            <li className="like-button-wrap">
                                <div className="heart-icon">
                                    {post.likePositive
                                        ? (<div className="heart1" onClick={()=>this.decrLikes(post._id)}></div>)
                                        : (<div className="heart0" onClick={()=>this.incrLikes(post._id)}></div>)
                                    }
                                </div>
                                <div className="like-number">{post.likes}</div>
                            </li>
                            <li className="bookmark">
                                <button className="savebutton" onClick={()=>this.saveToggle(post._id)}>save</button>
                            </li>
                        </ul>
                    </figcaption>
                </figure>
                <Modal show={this.state.authModal}
                       onHide={this.close}
                       dialogClassName='custom-auth-modal'
                >
                    <Modal.Header closeButton>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Sign in">
                                <LoginFormModal toggle={this.toggle}/>
                            </Tab>
                            <Tab eventKey={2} title="Sign up">
                                <SignupFormModal toggle={this.toggle}/>
                            </Tab>
                        </Tabs>
                    </Modal.Header>
                </Modal>
                <Modal show={this.state.alertModal.toggle}
                       onHide={this.close}
                       dialogClassName='custom-alert-modal'
                >
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>{this.state.alertModal.text}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        incrementLikes:incrementLikes,
        decrementLikes:decrementLikes,
        save:save
    },dispatch);
}
export default connect(null,mapDispatchToProps)(Post);