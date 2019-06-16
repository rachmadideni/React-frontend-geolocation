import React from 'react';
// import MapGL, { Source, Layer, NavigationControl, FullscreenControl } from '@urbica/react-map-gl';
// import Draw from '@urbica/react-map-gl-draw';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';

import DashboardTab from './DashboardTab';

import { BATAS_KECAMATAN, SUNGAI, SUNGAI2 } from './constants';

const OverlayComponent = styled.div`
	position: absolute;
	width: 28%;
	height:580px;
	top: 75px;
	right: 50px;
`


class MapContainer extends React.Component {
	
	map;
	ACCESS_TOKEN;
	DEFAULT_ZOOM;
	DEFAULT_COORDINATE;

	constructor(props){
		super(props);		
		this.ACCESS_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
		this.DEFAULT_ZOOM = 12;
		
		this.state = {
			viewport:{
				width:'100vw',
				height:'100vh',
				latitude:-4.781090,
				longitude:119.660544,
				zoom:10				
			},
			features:[],
			mode:'simple_select',
			tabValue:0,
			sungai:SUNGAI,
			sungai2:SUNGAI2
		};
	}

	componentDidMount(){

	}

	handleTabChange = (event,value) => {
		this.setState({ tabValue:value })
	}

	render() {
		const { 
			viewport,
			tabValue
		} = this.state

		return (
			<React.Fragment>
				
				<ReactMapGL 
					{...viewport}
					mapboxApiAccessToken={this.ACCESS_TOKEN}
					onViewportChange={(viewport)=>this.setState({viewport})} />

				<OverlayComponent>
					<Card style={{ height:'100%' }}>
				      <CardContent>
				      	<Tabs
				          value={tabValue}
				          indicatorColor="primary"
				          textColor="primary"
				          onChange={this.handleTabChange}				          
				        >
				          <Tab icon={<DashboardIcon />} />				          
				          <Tab icon={<CheckCircleIcon />} />
				        </Tabs>
				        { tabValue === 0 && <DashboardTab />}
				        { tabValue === 1 && <div>konten tab 2</div>}				        
				      </CardContent>
				    </Card>
				</OverlayComponent>

			</React.Fragment>
		);
	}
}

export default MapContainer;