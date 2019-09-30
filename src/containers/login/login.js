import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAlert} from 'mdbreact';

import './login.css';
import * as authAction from '../../action/action';

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
    componentDidMount(){
        this.props.auth.err = "";
    }
    render() {
        return(
            <MDBContainer className="login-container d-flex align-items-center justify-content-center">
                <MDBCard>
                    <MDBCardBody>
                        <form className="needs-validation"
                              onSubmit={this.btnLogIn_Click.bind(this)}>
                            <p className="h5 text-center mb-4">Sign in</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Email Address"
                                    icon="envelope"
                                    group
                                    type="email"
                                    validate
                                    onChange={this.changeHandler.bind(this)}
                                    required
                                />
                                <MDBInput
                                    label="Password"
                                    icon="lock"
                                    group
                                    type="password"
                                    id="password"
                                    minLength={6}
                                    validate
                                    onChange={this.changeHandler.bind(this)}
                                    required
                                />
                                {
                                    (this.props.auth.err) ? <MDBAlert color="danger">
                                        {this.props.auth.err}</MDBAlert> : null
                                }
                            </div>
                            <div className="text-center">
                                <MDBBtn type="submit" color="primary">Login</MDBBtn>
                            </div>
                            <div className="font-weight-light">
                                Not a member? <Link to="signUp">Sign Up</Link>
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
    return {auth}
};
const mapDispatchToProps = (dispatch) => ({
    action : {
        auth : bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
