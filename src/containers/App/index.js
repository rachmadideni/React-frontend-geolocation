import React from 'react';
import { 
  Switch, 
  Route, 
  Redirect 
} from 'react-router-dom';

// PAGES
import SignIn from '../SignIn';
import Dashboard from '../Dashboard';

function App(){
	return (		
  		<Switch>
  			<Route exact path="/" render={() => <Redirect to="/signin" />} />
  			<Route path = "/signin" component = { SignIn } />
  			<Route path = "/" 
  				render={
  					routeProps => (
  						<Dashboard {...routeProps} />
  					)} />
    	</Switch>    	
	);
}

export default App