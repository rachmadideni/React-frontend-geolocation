import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import DrawRiverPage from './DrawRiverPage';
import DrawProjectPage from './DrawProjectPage'; // disable sementara

import DrawRiverShapePage from './DrawRiverShapePage';
import DownloadPage from '../DownloadPage';
import UploadShapePage from '../UploadShapePage';

class MapContainer extends React.Component {

	render(){
		
		return (
			<Fragment>
				<Switch>
					<Route 
						exact 
						path="/draw/riverAtribut" 
						render={routeProps => (
							<DrawRiverPage {...routeProps} />
						)} />

					<Route 
						exact 
						path="/draw/riverShape" 
						render={routeProps => (
							<DrawRiverShapePage {...routeProps} />
						)} />

					<Route 
						exact 
						path="/draw/project" 
						render={routeProps => (
							<DrawProjectPage {...routeProps} />
						)} />

					<Route 
						exact 
						path="/download" 
						render={routeProps => (
							<DownloadPage {...routeProps} />
						)} />

					<Route 
						exact 
						path="/upload/shape" 
						render={routeProps => (
							<UploadShapePage {...routeProps} />
						)} />
				</Switch>																			
			</Fragment>
		);
	}
}

export default MapContainer;