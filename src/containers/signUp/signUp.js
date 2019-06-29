import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import './signUp.css'
import * as authAction from '../../action/action'
import {Link} from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody} from 'mdbreact'

class SignUp extends Component{
    state = {
        err:"",
        email : "",
        password : "",
        rePassword : ""
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    btnSignUp_Click = (e) => {
        e.preventDefault();
        this.setState({err:""})
        if(this.state.password !== this.state.rePassword)
            this.setState({err:"password does not match"});
        else if(this.state.password.length < 6)
            this.setState({err:"password should 6 or more in length"});
        else
            this.props.action.auth.signUpUser({email:this.state.email,password:this.state.password});

    }
    render() {
        return(
            <MDBContainer>
                <MDBRow className="flex-center">
                    <MDBCol md="5" style={{marginTop: "15%"}}>
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h5 text-center mb-4">Sign up</p>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="Your email"
                                            icon="envelope"
                                            group
                                            type="email"
                                            name="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={this.changeHandler.bind(this)}
                                        />
                                        <MDBInput
                                            label="Your password"
                                            icon="lock"
                                            group
                                            type="password"
                                            name="password"
                                            validate
                                            onChange={this.changeHandler.bind(this)}
                                        />
                                        <MDBInput
                                            label="Confirm your password"
                                            icon="exclamation-triangle"
                                            group
                                            type="password"
                                            name="rePassword"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={this.changeHandler.bind(this)}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn color="primary" onClick={this.btnSignUp_Click.bind(this)}>Register</MDBBtn>
                                    </div>
                                    <div className="font-weight-light">
                                        Already have an account? <Link to="login">Login</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
