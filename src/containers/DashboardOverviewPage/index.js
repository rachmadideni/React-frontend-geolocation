import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MapCrud from '../Map';
import MapUtama from '../MapRevised';

class DashboardOverviewPage extends React.Component {
		
		render(){
			const { history } = this.props;
			return (
				<Switch>
					<Route 
						exact 
						path="/dashboard" render={ () => <MapUtama history = { history } /> } />
					
					<Route						
						path="/dashboard/revised" render={()=><MapCrud />} />

				</Switch>
			);			
		}
}

export default DashboardOverviewPage;