import React, {Component} from 'react'
import {Navbar,NavbarBrand, Nav, NavItem, Button, NavLink } from 'reactstrap'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as authAction from '../../action/action'
import * as bioDataAction from '../../action/bioDataAction'
import * as notesAction from '../../action/notesAction'

class Header extends Component {
    handleClick = (e) => {
        e.preventDefault();
        this.props.action.bioData.unSetBioData();
        this.props.action.notes.unSetNotes();
        this.props.action.auth.logoutUser();
    }
    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">
                    Notes App
                </NavbarBrand>
                {this.props.auth.token !== ""?
                <Nav className="ml-auto" navbar>
                    <NavItem><NavLink  tag={Link} to="/">Home</NavLink></NavItem>
                    <NavItem><NavLink  tag={Link} to="/notes">My Notes</NavLink></NavItem>
                    <NavItem><NavLink  tag={Link} to="/bioData">Bio-Data</NavLink></NavItem>
                    <Button color="info" onClick={this.handleClick.bind(this)}>Log out</Button>
                </Nav>
                :null}
            </Navbar>
        )
    }
}


const mapStateToProps = (state) => {
    const {auth, bioData, notes} = state;
    return {auth, bioData, notes}
};
const mapDispatchToProps = (dispatch) => ({
    action : {
        auth : bindActionCreators(authAction, dispatch),
        bioData : bindActionCreators(bioDataAction, dispatch),
        notes : bindActionCreators(notesAction, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);