import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import BookTable from './Components/BookTable/BookTable';
import Gallery from './Components/Gallery/Gallery';
import Menu from './Components/Menu/Menu';
import Franchise from './Components/Franchaise/Franchaise';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import Admin from './Components/AdminAccount/Admin';
import {BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Account from './Components/UserAccount/User';

//Implementing Router
//This Component render different components based on the routes
function App() {
  return (
    <>
    <Router>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/Home' component={Home}/>
            <Route path='/BookTable' component={BookTable}/>
            <Route path='/Franchise' component={Franchise}/>
            <Route path='/Gallery' component={Gallery}/>
            <Route path='/Menu' component={Menu}/>
            <Route path="/Signin" component={Signin}/>
            <Route path='/Signup' component={Signup}/>
            <Route path='/Account' component={Account}/>
            <Route path='/Admin' component={Admin}/>
            
        </Switch>
    </Router>
    </>
  );
}
export default App;
