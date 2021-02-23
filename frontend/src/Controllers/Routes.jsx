
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
import About from '../Components/About/About'
import Todo from '../Components/Todo/Todo'

export default props => (
<Router>
    <Switch>
        <Route path='/todos' component={Todo} />
        <Route path='/about' component={About} />      
        <Redirect from='*' to='/todos' />    
    </Switch>
    
</Router>
   
)

