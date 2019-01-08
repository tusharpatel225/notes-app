import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import './login.css'
import * as authAction from '../../action/action'
import {Link} from 'react-router-dom'
import {FormGroup, Button, Input, Label, Alert} from 'reactstrap'

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

            <div className="login">
                {
                    (this.props.auth.err)?<Alert color="danger">{this.props.auth.err}</Alert>:null
                }
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="abc@xyz.com" onChange={this.changeHandler.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" placeholder="enter password" onChange={this.changeHandler.bind(this)}/>
                </FormGroup>
                <div className="btn">
                <Button onClick={this.btnLogIn_Click.bind(this)}>LOG IN</Button>
                <Button color="link" tag={Link} to="/signUp">SIGN UP</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
