import React, { Fragment } from 'react';
import MapGL, { 
	NavigationControl, 
	FullscreenControl,
	LinearInterpolator	
} from '@urbica/react-map-gl';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
// import { changeMapModeAction } from './action';
import injectReducer from '../../utils/injectReducer';

import { 
	changeTabValueAction,
	changeViewportAction,
	// getGeojonAction,
	putMarkerSuccessAction,
	clearMarkerSuccessAction,
	changeDasModeAction,
	getRiverAction,
	getProjectAction
} from './action';

import { 
	makeSelectTabValue, 
	makeSelectMapConfig,
	makeSelectMapViewport,
	//makeSelectGeojson,
	makeSelectMarker,
	makeSelectMapStyle,
	makeSelectLayerVisibility,
	makeSelectDASMode,
	makeSelectRiverFeatures,
	makeSelectRiverData,
	makeSelectProjectData,
	makeSelectLoading
} from './selectors';

import { SUNGAI } from './constants';

//import BatasKecamatan from './Layer/BatasKecamatan';
import ProjectMark from './Layer/ProjectMark';
// import Sungai from './Layer/Sungai';
import RiverMap from './Layer/RiverMap';

import LoadingDialog from '../../components/LoadingDialog';

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

	componentWillMount(){
		// this.props.getRiver();
		// this.props.getProject();
	}

	componentDidUpdate(){
		// this.props.getProject();	
	}

	componentDidMount(){
		this.props.getRiver();
		this.props.getProject();
		// console.log(this.myMap)
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

	_renderDrawControlType = (e) => {
		// console.log('_renderDrawControlType',e);
		const {
			layerVisibility
		} = this.props

		if(e){
			if (e.type === "load") {
				// if(layerVisibility.project){
					this._callDrawProject();		
				// }
			}			
		}
	}

	_callDrawProject = () => {
		const { 
			layerVisibility,
			geodataProject, // data project
			geodata // data sungai
		} = this.props;

		if(layerVisibility.project){
			return (
				<ProjectMark 
					data = { geodataProject } riverData = { this.props.geodata } />
			);			
		}else if(layerVisibility.sungai){
			return (
				<RiverMap 
					data={this.props.geodata} fetchRiver={this.props.getRiver} />
			);
		}
	}

	render(){
		
		const { 
			// tabValue,
			mapConfig,
			viewport,
			mapStyle,
			layerVisibility,
			// DASMode,
			geodata,
			geodataProject,
			isLoading
		} = this.props;

		return (
			<Fragment>
				<LoadingDialog 
					isLoading={isLoading} />			
				
				<MapGL
					ref = { (myMap) => { this.myMap = myMap; } } 					
					accessToken = { mapConfig.token } 
					latitude = { viewport.latitude } 
					longitude = { viewport.longitude } 
					zoom = { viewport.zoom }
					mapStyle={mapStyle}
					style={{ width: '100vw', height: '90vh' }}
					onViewportChange = { 
						viewport => this.handleViewportChange(viewport)
					}
					onLoad = {e=>this._renderDrawControlType(e)} >

					{this._callDrawProject()}
										
					{/*						
						layerVisibility.project && 
						<ProjectMark 
							data = { geodataProject } riverData = { this.props.geodata } />
					*/}
					
					{/*
						// render river hanya jika features punya isi
						// jike river visible = true dan data river ada   
						(layerVisibility.sungai && geodata.features.length > 0) &&
						<RiverMap 
							data={this.props.geodata} 
							fetchRiver={this.props.getRiver} />												
					*/}					
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
	geodata:makeSelectRiverData(),
	geodataProject:makeSelectProjectData(),
	marker: makeSelectMarker(),	
	mapStyle: makeSelectMapStyle(),
	layerVisibility: makeSelectLayerVisibility(),
	DASMode: makeSelectDASMode(),
	selectRiverFeatures: makeSelectRiverFeatures(),
	isLoading: makeSelectLoading(),
	//geoData: makeSelectGeojson(),
});

function mapDispatchToProps(dispatch){
	return {
		getRiver: () => dispatch(getRiverAction()),
		getProject: () => dispatch(getProjectAction()),
		changeTabValue: (value) => dispatch(changeTabValueAction(value)),
    changeViewport: ({ latitude, longitude, zoom }) => dispatch(changeViewportAction({ latitude, longitude, zoom })),
    putMarker: payload => dispatch(putMarkerSuccessAction(payload)),
    clearMarker: () => dispatch(clearMarkerSuccessAction()),
    changeDasMode: payload => dispatch(changeDasModeAction(payload)),
		// changeMapMode:()=>dispatch(changeMapModeAction()),
		// getGeojon: key => dispatch(getGeojonAction(key)),
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

const withReducer = injectReducer({ key: 'mapContainer', reducer });
const withSaga = injectSaga({ key: 'mapSaga', saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(MapContainer);
