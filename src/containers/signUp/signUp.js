import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import './signUp.css'
import * as authAction from '../../action/action'
import {Link} from 'react-router-dom'
import { FormGroup, Button, Input, Label, Alert} from 'reactstrap'

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
            <div className="signUp">

                {
                    (this.state.err)?<Alert color="danger">{this.state.err}</Alert>
                        :(this.props.auth.err)?<Alert color="danger">{this.props.auth.err}</Alert>
                        :null
                }

                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="abc@xyz.com" onChange={this.changeHandler.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" name="password" placeholder="enter password" onChange={this.changeHandler.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Re-enter password</Label>
                    <Input type="password" name="rePassword" placeholder="re-enter password" onChange={this.changeHandler.bind(this)}/>
                </FormGroup>
                <div className="btn">
                <Button onClick={this.btnSignUp_Click.bind(this)}>SIGN UP</Button>
                <Button color="link" tag={Link} to="/login">LOG IN</Button>
                </div>
            </div>
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
