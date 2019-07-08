import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MapCrud from '../Map';
import MapUtama from '../MapRevised';

/*
TODO :
buat halaman utk draw sungai, draw project & map utama (gabungan keduanya tanpa fitur draw hanya view saja)
 */

class DashboardOverviewPage extends React.Component {
		
		render(){
			const { history } = this.props;
			return (
				<Switch>

					<Route 
						exact 
						path="/dashboard" component = { MapUtama } /> 
					
					<Route
						exact						
						path="/draw/sungai" component = { MapCrud }  />

					<Route
						exact						
						path="/draw/proyek" component = { MapCrud }  />

				</Switch>
			);			
		}
}

/*
render={ () => <MapCrud history = { history } /> } />
render={()=><MapUtama />}
 */

export default DashboardOverviewPage;