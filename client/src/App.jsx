import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import ProtectedRoute from './ProtectedRoute';

const App = () => {

    return (  
        <div>
          
      
        <Switch>
            <ProtectedRoute path="/home" component={Home}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Redirect from="/" to="/login"/>

            
        </Switch>
        
        </div>
    );
    };

export default App;