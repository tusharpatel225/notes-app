import React, { Component } from 'react'
import {BrowserRouter as Router, Switch} from "react-router-dom"

import Header from '../header/header'
import Login from '../login/login'
import SignUp from '../signUp/signUp'
import Home from '../home/home'
import PageNotFound from '../pageNotFound/pageNotFound'
import CRoute from '../../Route/croute'
import Notes from '../notes/notes'
import BioData from '../bioData/bioDataHandler'
import Loader from '../loader/loader';

class App extends Component {
    render() {
        return (
            <Router>
                <>
                    <Header/>
                    <Loader/>
                    <Switch>
                        <CRoute cprivate path="/" exact component ={Home}/>
                        <CRoute path="/login" exact component ={Login}/>
                        <CRoute path="/signUp" exact component ={SignUp}/>
                        <CRoute cprivate path="/notes" exact component={Notes}/>
                        <CRoute cprivate path="/bioData" exact component={BioData}/>
                        <CRoute component ={PageNotFound}/>
                    </Switch>
                </>
            </Router>
        );
    }
}

export default App;
