import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import './login.css'
import * as authAction from '../../action/action';
import {Link} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody} from 'mdbreact';

class Login extends Component{
    state = {
        email : "",
        password : ""
    }
    changeHandler = (e) => {
        this.setState({ [e.target.type]: e.target.value })
    }
    btnLogIn_Click = (e) => {
        e.preventDefault();
        this.props.action.auth.loginUser(this.state);
    }
    render() {
        return(
            <MDBContainer>
                <MDBRow className="flex-center">
                    <MDBCol md="5" style={{marginTop: "15%"}}>
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h5 text-center mb-4">Sign in</p>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="Email Address"
                                            icon="envelope"
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={this.changeHandler.bind(this)}
                                        />
                                        <MDBInput
                                            label="Password"
                                            icon="lock"
                                            group
                                            type="password"
                                            validate
                                            onChange={this.changeHandler.bind(this)}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn color="primary" onClick={this.btnLogIn_Click.bind(this)}>Login</MDBBtn>
                                    </div>
                                    <div className="font-weight-light">
                                        Not a member? <Link to="signUp">Sign Up</Link>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

const mapStateToProps = (state) => {
    const {auth} = state;
    return {auth:auth}
};
const mapDispatchToProps = (dispatch) => ({
    action : {
        auth : bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
