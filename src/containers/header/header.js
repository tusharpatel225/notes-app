import React, {Component} from 'react'
import {MDBNavbar,MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBIcon,MDBDropdown,MDBDropdownToggle
    ,MDBDropdownMenu, MDBDropdownItem} from 'mdbreact';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as authAction from '../../action/action'
import * as bioDataAction from '../../action/bioDataAction'
import * as notesAction from '../../action/notesAction'
import './header.css';

class Header extends Component {
    state = {
        activeTab : "/"
    }
    handleClick = (e) => {
        e.preventDefault();
        this.props.action.auth.logoutUser();
        this.props.action.bioData.unSetBioData();
        this.props.action.notes.unSetNotes();
    }
    componentDidMount(){
        let location = window.location.toString();
        let tab = location.substr(location.lastIndexOf("/"));
        this.setState({activeTab : tab})
    }
    componentWillUpdate(){
        let location = window.location.toString();
        let tab = location.substr(location.lastIndexOf("/"));
        if(this.state.activeTab !== tab){
            this.setState({activeTab : tab})
        }
    }
    navClick = (e) => {
        e.preventDefault();
        let location = window.location.toString();
        this.setState({activeTab : location.substr(location.toString().lastIndexOf("/"))})
    }
    render() {
        return (
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand href="/" onClick={() => {this.setState({activeTab:"/"})}}>
                    Notes App
                </MDBNavbarBrand>
                {this.props.auth.token !== ""?
                <MDBNavbarNav right>
                    <MDBNavItem active={this.state.activeTab === "/"} onClick={this.navClick}>
                        <MDBNavLink to="/">
                            <MDBIcon icon="home" className="d-inline-inline" />
                            <div className="d-none d-md-inline"> Home</div>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={this.state.activeTab === "/notes"} onClick={this.navClick}>
                        <MDBNavLink to="/notes">
                            <MDBIcon icon="sticky-note" className="d-inline-inline" />
                            <div className="d-none d-md-inline"> My Notes</div>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <MDBIcon icon="user" className="d-inline-inline" />
                                <div className="d-none d-md-inline"> Account</div>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu right>
                                <MDBDropdownItem className="menu-link" active={this.state.activeTab === "/bioData"} tag={MDBNavLink} to="/bioData"
                                                 onClick={ () => this.setState({activeTab:"/bioData"})}>Bio-data</MDBDropdownItem>
                                <MDBDropdownItem onClick={this.handleClick.bind(this)}>Logout</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
                :null}
            </MDBNavbar>
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