import React from 'react';
// Map gl
import MapGL, { 
	Source, 
	Layer, 
	Marker,
	FeatureState,
	NavigationControl, 
	FullscreenControl	
} from '@urbica/react-map-gl';

import Draw from '@urbica/react-map-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

// Material ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { changeMapModeAction } from './action';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { 
	changeTabValueAction,
	changeViewportAction,
	getGeojonAction,
	putMarkerSuccessAction,
	clearMarkerSuccessAction } from './action';
import { 
	makeSelectTabValue, 
	makeSelectMapConfig,
	makeSelectMapViewport,
	makeSelectGeojson,
	makeSelectMarker } from './selectors';

import { BATAS_KECAMATAN, SUNGAI } from './constants';
import DashboardTab from './DashboardTab';
import SectionContainer from './SectionContainer';

class MapContainer extends React.Component {

	constructor(props){
		super(props);
		this._map = React.createRef();		
		
		this.state = {			
			clickedSungaiId:null,
			selectedRiverId:null,
			riverDetails:{
				idkecm:null,
				nmkecm:null,
				idsung:null,
				nmsung:null
			},
			viewport:{								
				latitude:-4.699321,
				longitude:118.905604,
				zoom:9			
			},
			features:[],
			mode:'simple_select',
			sungai:SUNGAI,
			marker:[],
			markerTest:[]
			
		};		
	}

	componentDidMount(){
		const { getGeojon } = this.props;
		// getGeojon('sungai');

		/*const map = this._map.current.getMap();
    	map.once('load', () => {
      		map.setPaintProperty('water', 'fill-color', '#db7093');
    	});*/				
	}

	componentDidUpdate(){
		console.log(this.props);
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
			latitude,longitude,zoom
		});
	}

	addMarker = (event) => {
		if (event.features.length > 0) {
			 const coordinates = event.features[0].geometry.coordinates;
			 const longitude = coordinates[0];
			 const latitude = coordinates[1]; 
			 // console.log(coordinates);
			return (
					<Marker longitude={longitude} latitude={latitude} children={<div>marker</div>} />
			);
		}
	}

	renderDraw = () => {
		const { mode, sungai, } = this.state
		const { tabValue, geojson_map } = this.props;
		
		if(tabValue === 2){
			
			return (
				<Draw 
				  	mode={mode}
				  	data={sungai}
				  	position="top-right"	
				  	keybindings				  	
				  	displayControlsDefault
				  	lineStringControl	
				  	polygonControl={false}
				  	onChange={ event => console.log('onChange draw:',event) }
				  	onDrawSelectionChange={event=>this.addMarker(event)}
				  	onDrawUpdate={event=>this.addMarker(event)}
				    />
			);
			// onDrawSelectionChange :
			// berfungsi pada saat kita klik line

			// onDrawSelectionChange={event=>this.addMarker(event)}
			// onDrawSelectionChange={event=>this.showRiverDetails(event)}
			// onDrawUpdate={({sungai}) => this.setState({sungai})  }
		}
	}

	handleAddProject = (event) => {
		const { selectedRiverId } = this.state;
		const idsungai = event.features[0].properties.idsung;
		this.setState({ selectedRiverId:idsungai })
	}

	persistMarkerToState = (event) => {
		
		const { marker } = this.props;
		const { coordinates } = event.features[0].geometry;

		console.log('persit marker:',event);
		let markerData = []
		markerData.push(coordinates);
		this.props.putMarker(markerData);

		// this.setState({ marker:markerData });
		/*return (
			<Marker longitude={coordinates[0]} latitude={coordinates[1]}>
				<h1>project marker</h1>
			</Marker>
		)*/
	}

	renderMapForMarker = () => {
		const { sungai } = this.state
		const { tabValue, marker } = this.props;
		

		if(tabValue == 1){
			return (
				<React.Fragment>
					<Source id='sungai' type='geojson' data={sungai} />
					<Layer 
					  	id="garis_sungai"
					  	type="line"
					  	source='sungai'
					  	paint={{					      
					      'line-color': '#3BB2D0',
					      'line-width': 1,					      
					    }}
					    radius={12}
					    onClick={(event)=>this.handleAddProject(event)} />
					

					<Source 
						id='points' 
						type='geojson' 
						data={this.props.marker} />

					<Layer
				      id='points'
				      type='circle'
				      source='points'
				      paint={{
				        'circle-radius': 12,
				        'circle-color': '#c6094f'
				      }}
				    />
					{/* tambah draw utk menambah marker saja*/}

					{
						marker.length <= 1 && 
						<Draw							
							clickBuffer={12}

							polygonControl={false}
							trashControl={false}
							combineFeaturesControl={false}
							uncombineFeaturesControl={false}
							lineStringControl={false}  					  		
						  
						  onDrawCreate = { event => this.persistMarkerToState(event) }					  	
						  onDrawUpdate = { event => this.persistMarkerToState(event) }
						   />
					}
				</React.Fragment>
			);
		}
	}

	

	onClickKecamatan = event => {
		if(event.features.length > 0){
			const hoveredStateId = event.features[0].id;
			// console.log(event.features[0].properties.nama_kec);
		}

		// console.log(event);
	}

	onClickSungai = event => {
		if(event.features.length > 0){
			const clickedSungaiId = event.features[0].id;
			if(clickedSungaiId !== this.state.clickedSungaiId){
				this.setState({ clickedSungaiId })
			}
			// console.log(event.features[0].properties.nmsung);
		}
	}	

	showRiverDetails = event => {
		requestAnimationFrame(() => {
			const riverId = event.features[0].properties.idsung;
			const riverDetails = event.features[0].properties;
			// console.log('River id:',riverId)
			this.setState({
				selectedRiverId:riverId,
				riverDetails
			});

		});
	}

	

	render(){
		const { features, mode, sungai } = this.state;
		const { 
			tabValue,
			mapConfig,
			viewport
		} = this.props;		
		return (
			<React.Fragment>				
				<MapGL ref={this._map}
					  accessToken = { mapConfig.token } 
					  latitude = { viewport.latitude } 
					  longitude = { viewport.longitude } 
					  zoom = { viewport.zoom }
					  mapStyle='mapbox://styles/mapbox/light-v9'
					  style={{ 
					  	width: '100vw', 
					  	height: '90vh' 
					  }}
					  onViewportChange = { viewport => this.handleViewportChange(viewport) }>
					
					  <Source id='kecamatan' type='geojson' data = { BATAS_KECAMATAN } />
					  
					  <Layer id='kecamatan' type='line' source='kecamatan'
					    layout={{
					      'line-join': 'round',
					      'line-cap': 'round'
					    }}
					    paint={{					      
					      'line-color': '#888',
					      'line-width': 1,
					      "line-dasharray": [2, 4]
					    }} />

					  <Layer id='fill_kecamatan' type='fill' source='kecamatan'
					  	paint={{					  		
					  		'fill-color':{
					  			type: 'identity',
					  			property:'color'
					  		},
					  		'fill-opacity':0.1,
					  		// 'fill-outline-color': 'rgba(200, 100, 240, 1)'
					  	}} onClick={(event)=>this.onClickKecamatan(event)} />
					  
					  
					  {this.renderDraw()}
					  {this.renderMapForMarker()}

					  <NavigationControl showZoom position='bottom-right' />
					  <FullscreenControl position='bottom-right' />

					    {/*

					    (sungai) => this.setState({sungai2:sungai})

					    	onDrawModeChange={({ mode }) => this.setState({ mode })} 					  	
					  	onDrawCreate={({sungai}) => this.setState({sungai})}
					    onDrawUpdate={({sungai}) => this.setState({sungai})}
					  	combineFeaturesControl={false} 
					  	onChange={(sungai) => this.setState({sungai})}

					    	onChange={(sungai) => this.setState({sungai})}
					    	
					    */}					  
				</MapGL>
				<SectionContainer 
					tabValue = { this.props.tabValue }
					onChangeTabValue = {this.onChangeTabValue}
					marker={this.props.marker} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	tabValue: makeSelectTabValue(),
	mapConfig: makeSelectMapConfig(),
	viewport: makeSelectMapViewport(),
	geojson_map: makeSelectGeojson(),
	marker: makeSelectMarker()
});

function mapDispatchToProps(dispatch){
	return {
		changeMapMode:()=>dispatch(changeMapModeAction()),
		changeTabValue: (value)=>dispatch(changeTabValueAction(value)),
		changeViewport: ({ latitude, longitude, zoom })=> dispatch(changeViewportAction({ latitude,longitude,zoom })),
		getGeojon: key => dispatch(getGeojonAction(key)),
		putMarker: payload => dispatch(putMarkerSuccessAction(payload)),
		clearMarker: () => dispatch(clearMarkerSuccessAction())
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

const withReducer = injectReducer({ key: 'mapContainer', reducer });
const withSaga = injectSaga({ key: 'mapContainer', saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(MapContainer);
