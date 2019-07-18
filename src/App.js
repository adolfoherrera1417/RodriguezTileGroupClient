import React, { Component } from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/login/Login'
import Auth from './components/login/Auth'
import Home from './components/home/Home'
import Tiles from './components/view-tile/Tiles'

import './App.css';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
      <Switch>

        {/* Unprotected Routes */}
        <Route path='/login' component={Login}/>

        {/* Protected Routes */}
        <Auth>
          <Route path='/' exact component={Home}/>
          <Route path='/tiles' exact component={Tiles}/>
        </Auth>

      </Switch>
    </BrowserRouter>
  );
  }
}

export default App;