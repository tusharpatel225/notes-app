import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import { MDBContainer, MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBAlert} from 'mdbreact'

import '../login/login.css'
import * as authAction from '../../action/action'

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
        this.setState({err:""});
        if(this.state.password !== this.state.rePassword) {
            this.setState({err: "password does not match"});
        }
        else
            this.props.action.auth.signUpUser({email:this.state.email,password:this.state.password});

    }
    componentDidMount(){
        this.props.auth.err = "";
    }
    render() {
        return(
            <MDBContainer className="login-container d-flex align-items-center justify-content-center">
                <MDBCard>
                    <MDBCardBody>
                        <form className="needs-validation"
                              onSubmit={this.btnSignUp_Click.bind(this)}>
                            <p className="h5 text-center mb-4">Sign up</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Your email"
                                    icon="envelope"
                                    group
                                    type="email"
                                    name="email"
                                    validate
                                    required
                                    onChange={this.changeHandler.bind(this)}
                                />
                                <MDBInput
                                    label="Your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    name="password"
                                    required
                                    minLength={6}
                                    maxLength={10}
                                    validate
                                    onChange={this.changeHandler.bind(this)}
                                />
                                <MDBInput
                                    label="Confirm your password"
                                    icon="exclamation-triangle"
                                    group
                                    type="password"
                                    name="rePassword"
                                    required
                                    minLength={6}
                                    maxLength={10}
                                    validate
                                    onChange={this.changeHandler.bind(this)}
                                />
                                {
                                    (this.state.err) ? <div className="text-center">
                                        <MDBAlert color="danger">{this.state.err}</MDBAlert>
                                    </div> : (this.props.auth.err) ? <MDBAlert color="info">{this.props.auth.err}</MDBAlert> : null
                                }

                            </div>
                            <div className="text-center">
                                <MDBBtn color="primary" type="submit">Register</MDBBtn>
                            </div>
                            <div className="font-weight-light">
                                Already have an account? <Link to="login">Login</Link>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
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
