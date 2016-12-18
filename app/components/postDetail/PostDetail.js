/**
 * Created by HANG on 10/15/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {save} from './../../actions/saveActions';
import CommentsForm from '../comments/CommentsForm';
import {selectPost} from './../../actions/selectPost';
import LoginFormModal from '../modal/LoginFormModal';
import SignupFormModal from '../modal/SignupFormModal';
import {Modal,Button,Tab,Tabs} from 'react-bootstrap';

const PostDetail=React.createClass({
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
    componentWillMount(){
        const postId=this.props.params.postId;
        return this.props.selectPost(postId);
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
    render(){
        const {post}=this.props;
        return(
            <div className="postDetail-container container-fluid">
                <h1 id="post-title">{post.title}</h1>
                <div className="block-post-main">
                    <div className="post-header row-fluid">
                        <div className=" col-lg-5 post-photo"><img src={post.display_src} alt="NO IMAGE"/></div>
                        <div className=" col-lg-7 post-content">
                            <ul>
                                <li className="like-wrap">
                                    <div className="likes-number">{post.likes}</div>
                                    <p>likes</p>
                                </li>
                                <li className="save">
                                    <button className="save-button" onClick={()=>this.saveToggle(this.props.params.postId)}>save</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="description row-fluid">
                        <h3>Description</h3>
                        <p>{post.description}</p>
                    </div>
                    <div className="post-description row-fluid">
                        <div className=" col-lg-3 post-ingredients">
                            <h3>Ingredients</h3>
                            <ul className="ingredients">{post.ingredients.map((ingredient,i)=><li key={i}>{ingredient}</li>)}</ul>
                        </div>
                        <div className=" col-lg-9 post-steps">
                            <h3>Directions</h3>
                            <ol className="steps">{post.steps.map((step,i)=><li key={i}>{step}</li>)}</ol>
                        </div>
                    </div>
                </div>
                <CommentsForm postComments={this.props.postComments} postId={this.props.params.postId}/>

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

function mapStateToProps(state) {
    return{
        post:state.selectedPost,
        postComments:state.comments
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            save:save,
            selectPost:selectPost
        },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(PostDetail);