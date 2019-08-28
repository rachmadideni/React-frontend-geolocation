import React from 'react';
import PropTypes from 'prop-types';
import MapGL, { Source, Layer, Marker, NavigationControl, FullscreenControl, MapContext, Image } from '@urbica/react-map-gl';
import Draw from '@urbica/react-map-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';

// action
import {
	getRiverAction,
	// getProjectAction,
	changeViewportAction,
	clearProjectFormAction,
	replaceCoordinatesProjectAction,
	insertProjectFeaturesAction,
	addNewProjectAction,
	loadProjectAction,
	getProjectPropertiesAction,
} from './action'

// selector
import {
	makeSelectRiverData,
	makeSelectProjectData,
	makeSelectLoading,
	makeSelectMapConfig,
	makeSelectMapViewport,
	makeSelectMapStyle,
	selectProjectFeatures
} from './selectors';


// component
import LoadingDialog from '../../components/LoadingDialog';
import FormProject from './FormLayer/FormProject';
import FormCariKoordinat from './component/FormCariKoordinat';
// import FormProject2 from './FormLayer/FormProject2';
import { 
	RoomSharp,
	
	LocationSearching
	 } from '@material-ui/icons';

import Grid from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';

// import * as turf from '@turf/turf';
// import imageMarker0 from '../../icons/greenmarker256.png';
// import imageMarker1 from '../../icons/greenmarker256.png';

import TaludIcon from '../../icons/talud';
import Avatar from '@material-ui/core/Avatar';

class DrawProjectPage extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			// project:{}, // this.props.projectData
			featureId:null,
			features:[],
			markerLng:null,
			markerLat:null,
			SearchPositionControlIsOpen:false,
			// FormPositionControlButtonIsSubmitted:false,
			LongPos:"",//119.536600,
			LatPos:"",//-4.875469	
		}
	}

	componentDidMount(){
		this.props.getRiver();
		this.props.loadProject();
		this.setState({
			LongPos:"",
			LatPos:""
		})
		// this.props.getProject();
	}

	handleViewportChange = viewport => {
		const { changeViewport } = this.props;
		const { latitude, longitude, zoom } = viewport;
		return changeViewport({
			latitude,
			longitude,
			zoom
		});
	}

	SearchPositionControl = () => {
		return (			
			<Grid 
				container 
				wrap="nowrap"
				justify="center" 
				alignItems="center"
				style={{
					display:'flex',
					position:'absolute',
					top:150,
					right:10,					
				}}>
				
					<IconButton 
						disableRipple
						size="small" 
						style={{ fontSize: 12 }}
						onClick={()=>this.handleShowForm(!this.state.SearchPositionControlIsOpen)}>
						<LocationSearching />
					</IconButton>
				
			</Grid>
		);
	}

	handleShowForm = value => {
		this.setState({
			SearchPositionControlIsOpen:value,
			LongPos:"",
			LatPos:""
		})
	}

	handleTextField = (name,value) => {		
		this.setState({
			[name]:value
		})
	}

	handleSearchSubmit = () => {
		this.setState({
			SearchPositionControlIsOpen:false,
			// FormPositionControlButtonIsSubmitted:true
		});
	}
	
	renderSearchPositionForm = () => {
		return (
			<React.Fragment>
				<FormCariKoordinat 
					isOpen={this.state.SearchPositionControlIsOpen}
					LongPos={this.state.LongPos}
					LatPos={this.state.LatPos}
					handleShowForm={this.handleShowForm}
					handleTextField={this.handleTextField}
					handleSearchSubmit={this.handleSearchSubmit} />
			</React.Fragment>
		);
	}


	// MAP CONTROL (ZOOM,FULLSCREEN)
	renderNavigationControl = () => {
		return (
			<React.Fragment>
				<NavigationControl showZoom position='bottom-right' />
				<FullscreenControl position='bottom-right' />
			</React.Fragment>
		);
	}

	// syntax : componentDidUpdate(prevProps, prevState, snapshot)
	componentDidUpdate(prevProps, prevState){
			
		// console.log(prevProps.projectData); // props turunan atau dari redux
		// console.log(prevState.project); // previous state
		
		// if(prevState.project !== prevProps.projectData){
		// 	console.log('tdk sama');
		// 	// this.setState({
		// 	// 	project: prevProps.projectData,
  //  //  		river: prevProps.riverData
		// 	// })
		// }else{
		// 	// console.log('props dan state project === sama');			
		// }
	}

	/*_onSelectedProject = data => {
		console.log('_onSelectedProject :', data);
		if(data.features.length > 0){
			
			const currentProperties = data.features[0].properties;
			const featureId = data.features[0].id;
			// const featureId = currentProperties.featureId;
			const features = data.features;

			// const markerLng = data.features[0].geometry.coordinates[0];
			// const markerLat = data.features[0].geometry.coordinates[1];
						
			if(currentProperties.hasOwnProperty('nampro')){
				this.setState(state=>{
					return {
						featureId,
						features,
						// markerLng,
						// markerLat
					}
				});
				
			}else{

				// user mengklik point yang baru dibuat. setelah mengklik luar map
				// console.log('kondisi 2')
				
				this.setState(state=>{
					return {
						featureId,
						features,
						// markerLng,
						// markerLat
					}
				});

			}
		}else{

			// jika user mengklik pada map			
			this.setState(state=>{
				return {
					featureId:null,					
					// markerLng:null,
					// markerLat:null
				}
			});
		}		
	}*/

	_renderMarkerinNewPoint = () => {
		const { markerLng, markerLat } = this.state;
		
		if(markerLng && markerLat){
			return (
				<Marker 
					longitude={markerLng} 
					latitude={markerLat}
					offset={[0,-15]}>
						
							<RoomSharp style={{
								color:'green',
								fontWeight:'bold',
								fontSize:24							
							}}/>							
						
					</Marker>
			);			
		}
	}

	displayMarkerForProject = (feature,index) => {
		let { type, coordinates } = feature.geometry;
		let { properties } = feature;
		// console.log(properties);
		return (						
			<Marker
				key={`marker-${index}`}
				longitude={type === 'LineString' ? coordinates[0][0] : coordinates[0]}
				latitude={type === 'LineString' ? coordinates[0][1] : coordinates[1]}
				offset={[0,-25]}>
				{ properties.idMarker === 0 ? 
					<Avatar 
						style={{ 
							margin: 10,
							width:24,
							height:24,
							backgroundColor:'#6BD675' 
						}}>
							<RoomSharp 
								style={{
									color:'white',
									fontWeight:'bold',
									fontSize:24							
								}} />
						</Avatar> : 
						<Avatar style={{ 
							margin: 10,
							width:24,
							height:24,
							backgroundColor:'#6BD675' 
						}}>
							<TaludIcon />
						</Avatar>
				}				
			</Marker>			
		);

	}

	// UBAH LOKASI TITIK PROJECT
	_onDrawUpdate = data => {
		if(data.action === 'move'){
			console.log(data.features);
			this.props.replaceCoordinatesProject(data.features);
		}
	}

	// ini yg dipake
	_onSelectProject = data => {
			
			if(data.features.length > 0){

				const currentProperties = data.features[0].properties;
				const features = data.features;
				let featureId = null;
				if(currentProperties.hasOwnProperty('nampro')){
					// kondisi 1
					featureId = currentProperties.featureId;
				}else{
					// kondisi 2
					featureId = features[0].id;						
				}

				this.setState({
					featureId,
					features
				});				
				return this.props.getProjectProperties(featureId);				
				console.log('_onSelectProject : kondisi 1');
			}else{
				console.log('_onSelectProject : kondisi 2');
					// console.log('user selected condition #3!');	
					// this.setState(state=>{
					// 	return {
					// 		featureId:null					
					// 	}
					// });			
			}
	}

	 _onDrawCreate = data => {
		// console.log('draw: ',data)
		if(data.features.length > 0){			
			let featureId = data.features[0].id;			
			let features = data.features[0];			
			this.props.insertProjectFeatures(features);
			
			const lastProjectFeatureData = this.props.projectFeatures.slice(-1);
			const geometry = lastProjectFeatureData[0].geometry
			
			// saga : add project geometry tanpa properties 
			this.props.addNewProject({
				featureId,
				features:geometry
			});

			// set state untuk form project
			this.setState({
				featureId,
				features
			});
			
			// 
			// this.props.getProject();
		}
	}

	render(){

		const { 
			isLoading, 
			mapConfig, 
			viewport, 
			mapStyle,
			projectData } = this.props;
		
		const { features } = projectData;

		const {
			LongPos,
			LatPos
		} = this.state;

		return (
			<React.Fragment>
				<LoadingDialog isLoading = { isLoading } />
				<MapGL 
					{...viewport} 					
					accessToken = { mapConfig.token }
					mapStyle = { mapStyle }
					style = { { width: '100vw', height: '90vh' } }					
					onViewportChange = { viewport => this.handleViewportChange(viewport) }
					viewportChangeMethod={'flyTo'}>

					{this.renderNavigationControl()}
					{this._renderMarkerinNewPoint()}
					
					{this.SearchPositionControl()}
					{this.renderSearchPositionForm()}
					{features.map(this.displayMarkerForProject)}					

					{
						(
							this.state.SearchPositionControlIsOpen && 							
							this.state.LongPos && this.state.LatPos ) && (						
									<MapContext.Consumer>{
										map=>{								
											map.flyTo({center: [LongPos, LatPos], zoom: 13});
											return;
										}}
									</MapContext.Consumer>
						)
					}
					
					<Source 
						id="river" 
						type="geojson" 
						data={this.props.riverData} />

					<Source 
						id="marker_source" 
						type="geojson" 
						data={this.props.projectData} />

					<Layer 
						id="river" 
						type="line" 
						source="river" 
						paint={{ 
							'line-color': '#0497db',
							'line-width': 3,							
						}} />

					<Layer 
						id="marker_image"
						type="symbol"
						source="marker_source"
						layout={{							
							'text-field':'{nampro}',
							'text-size': ['step', ['get', 'sizerank'], 18, 9, 12],
							'text-font': ['DIN Offc Pro Medium','Arial Unicode MS Regular'],							
							'text-offset': [0, 0.6],
							'text-anchor': 'top',							
						}}
						paint={{
                'text-color': 'hsl(0, 0%, 37%)',
                'text-halo-color': 'hsl(0, 0%, 100%)',
                'text-halo-width': 1
            }} />

           <Layer 
           	id="river_text"
           	type="symbol"
           	source="river"
           	layout={{
           		'text-field':'{nmsung}',
           		'text-size': ['step', ['get', 'sizerank'], 18, 9, 12],
           		'text-font': ['DIN Offc Pro Medium','Arial Unicode MS Regular'],							
							'text-offset': [0, 0.6],
							'text-anchor': 'top',
           	}}
           	paint={{
                'text-color': 'hsl(256, 60%, 19%)',
                'text-halo-color': 'hsl(0, 0%, 100%)',
                'text-halo-width': 1                
            }} />

					<FormProject 
						featureId={this.state.featureId} 
						features={this.state.features}
						clearProjectForm={this.props.clearProjectForm} />

						{/*						
							onDrawSelectionChange = { data => this._onSelectedProject(data) }						
							onDrawUpdate = { e => this._onDrawUpdate(e) }
						*/}
									
					<Draw 
						data = { this.props.projectData }
						onDrawCreate = { e => this._onDrawCreate(e) }
						onDrawSelectionChange={e=>this._onSelectProject(e)}					
						displayControlsDefault={false}
						lineStringControl={true}
						trashControl={false}
						polygonControl={false}
						combineFeaturesControl={false}
						uncombineFeaturesControl={false} 
						pointControl={true} />

				</MapGL>
			</React.Fragment>
		);
	}
}

DrawProjectPage.propTypes = {
	isLoading: PropTypes.bool,
	mapConfig: PropTypes.object,
	viewport: PropTypes.object,
	handleViewportChange: PropTypes.func,
	renderNavigationControl: PropTypes.func,
	changeViewport: PropTypes.func
}

const mapStateToProps = createStructuredSelector({	
	isLoading: makeSelectLoading(),
	mapConfig: makeSelectMapConfig(),
	viewport: makeSelectMapViewport(),
	mapStyle: makeSelectMapStyle(),
	riverData: makeSelectRiverData(),
	projectData:makeSelectProjectData(),
	projectFeatures:selectProjectFeatures()
});

function mapDispatchToProps(dispatch){
	return {
		getRiver: () => dispatch(getRiverAction()),
		// getProject: () => dispatch(getProjectAction()),
		changeViewport: ({ latitude, longitude, zoom }) => dispatch(changeViewportAction({ latitude, longitude, zoom })),
		clearProjectForm: () => dispatch(clearProjectFormAction()),
		replaceCoordinatesProject: features => dispatch(replaceCoordinatesProjectAction(features)),
		insertProjectFeatures: features => dispatch(insertProjectFeaturesAction(features)),
		addNewProject: features=>dispatch(addNewProjectAction(features)),
		loadProject: () => dispatch(loadProjectAction()),
		getProjectProperties: featureId => dispatch(getProjectPropertiesAction(featureId))
	}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'mapProjectSaga', saga });

export default compose(withSaga, withConnect)(DrawProjectPage);