// container App
import React from 'react';
// import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from '../SignIn';
import Dashboard from '../Dashboard';

function App(){
	return (		
  		<Switch>
  			<Route exact path="/" render={() => <Redirect to="/signin" />} />
  			<Route path = "/signin" component = { SignIn } />
  			<Route exact path = "/dashboard" 
  				render={
  					routeProps => (
  						<Dashboard {...routeProps} />
  					)} />
  				{/*component = { Dashboard }*/}
    	</Switch>    	
	);
}

export default App