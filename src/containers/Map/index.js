import React, { Fragment } from 'react';
import MapGL, { 
	NavigationControl, 
	FullscreenControl	
} from '@urbica/react-map-gl';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
// import saga from './saga';
// import { changeMapModeAction } from './action';
// import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import { 
	changeTabValueAction,
	changeViewportAction,
	getGeojonAction,
	putMarkerSuccessAction,
	clearMarkerSuccessAction,
	changeDasModeAction
} from './action';

import { 
	makeSelectTabValue, 
	makeSelectMapConfig,
	makeSelectMapViewport,
	makeSelectGeojson,
	makeSelectMarker,
	makeSelectMapStyle,
	makeSelectLayerVisibility,
	makeSelectDASMode,
	makeSelectRiverFeatures
} from './selectors';

import { SUNGAI } from './constants';

import BatasKecamatan from './Layer/BatasKecamatan';
// import ProjectMark from './Layer/ProjectMark';
import Sungai from './Layer/Sungai';

// Components
// import DashboardTab from './DashboardTab';
// import SectionContainer from './SectionContainer';

class MapContainer extends React.Component {

	constructor(props){
		super(props);
		this.state = {			
			sungai:SUNGAI,			
		};		
	}

	componentDidMount(){		
		// const { getGeojon } = this.props;
		// getGeojon('sungai');

		/*const map = this._map.current.getMap();
    	map.once('load', () => {
      		map.setPaintProperty('water', 'fill-color', '#db7093');
    	});*/
    					
	}

	// REDUX CHANGE TAB HANDLER
	onChangeTabValue = value => {
		this.props.changeTabValue(value);
	}

	// REDUX HANDLE VIEWPORT CHANGES
	handleViewportChange = (viewport) => {
		const { 
			latitude, 
			longitude, 
			zoom } = viewport;

		this.props.changeViewport({
			latitude,
			longitude,
			zoom
		});
	}	

	renderNavigationControl = () => {
		return (
			<Fragment>
				<NavigationControl showZoom position='bottom-right' />
				<FullscreenControl position='bottom-right' />
			</Fragment>
		);
	}

	render(){
		
		const { 
			// tabValue,
			mapConfig,
			viewport,
			mapStyle,
			layerVisibility,
			DASMode,
			geoData
		} = this.props;	

		return (
			<Fragment>				
				<MapGL 					
					accessToken = { mapConfig.token } 
					latitude = { viewport.latitude } 
					longitude = { viewport.longitude } 
					zoom = { viewport.zoom }
					mapStyle={mapStyle}
					style={{ width: '100vw', height: '90vh' }}
					onViewportChange = { 
						viewport => this.handleViewportChange(viewport)
					}>						
					
					{layerVisibility.kecamatan && <BatasKecamatan />}
					{/*<ProjectMark />*/}
					{
						layerVisibility.sungai && 
						<Sungai 
							data={SUNGAI} 
							dt={this.props.selectRiverFeatures}
							geodata={geoData}
							DASMode={DASMode} />}					
					{ this.renderNavigationControl() }				  					    			  
				</MapGL>								
			</Fragment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	tabValue: makeSelectTabValue(),
	mapConfig: makeSelectMapConfig(),
	viewport: makeSelectMapViewport(),
	geoData: makeSelectGeojson(),
	marker: makeSelectMarker(),	
	mapStyle: makeSelectMapStyle(),
	layerVisibility: makeSelectLayerVisibility(),
	DASMode: makeSelectDASMode(),
	selectRiverFeatures: makeSelectRiverFeatures()
});

function mapDispatchToProps(dispatch){
	return {
		// changeMapMode:()=>dispatch(changeMapModeAction()),
		changeTabValue: (value)=>dispatch(changeTabValueAction(value)),
		changeViewport: ({ latitude, longitude, zoom })=> dispatch(changeViewportAction({ latitude,longitude,zoom })),
		getGeojon: key => dispatch(getGeojonAction(key)),
		putMarker: payload => dispatch(putMarkerSuccessAction(payload)),
		clearMarker: () => dispatch(clearMarkerSuccessAction()),
		changeDasMode: payload=>dispatch(changeDasModeAction(payload))
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

const withReducer = injectReducer({ key: 'mapContainer', reducer });
// const withSaga = injectSaga({ key: 'mapSaga', saga });

export default compose(
	withReducer,
	// withSaga,
	withConnect
)(MapContainer);
