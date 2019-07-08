import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from '../SignIn';

import Dashboard from '../Dashboard';
// import MapDraw from '../Map';
// import MapUtama from '../MapRevised';

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

        {/*<Route exact path="/draw/river" 
          render={
            routeProps=>(
              <MapDraw {...routeProps} />
            )} />*/}

    	</Switch>    	
	);
}

export default App