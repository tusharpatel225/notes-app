import React, { Component } from 'react'
import {BrowserRouter as Router, Switch} from "react-router-dom"

import Header from '../header/header'
import Login from '../login/login'
import SignUp from '../signUp/signUp'
import Home from '../home/home'
import PageNotFound from '../pageNotFound/pageNotFound'
import Ax from '../../hoc/ax'
import CRoute from '../../Route/croute'
import Notes from '../notes/notes'
import BioData from '../bioData/bioDataHandler'

class App extends Component {
  render() {
    return (

            <Router>
                <Ax>
                 <Header/>
                <Switch>
                    <CRoute cprivate path="/" exact component ={Home}/>
                    <CRoute path="/login" exact component ={Login}/>
                    <CRoute path="/signUp" exact component ={SignUp}/>
                    <CRoute cprivate path="/notes" exact component={Notes}/>
                    <CRoute cprivate path="/bioData" exact component={BioData}/>
                    <CRoute component ={PageNotFound}/>
                </Switch>
                </Ax>
            </Router>
    );
  }
}

export default App;
