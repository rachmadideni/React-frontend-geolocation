import React from 'react';
import PropTypes from 'prop-types';
import MapGL, { Source, Layer, Marker, NavigationControl, FullscreenControl } from '@urbica/react-map-gl';
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
// import FormProject2 from './FormLayer/FormProject2';
import { 
	RoomSharp,
	LinearScale } from '@material-ui/icons';

import Grid from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';

class DrawProjectPage extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			project:{}, // this.props.projectData
			// river:{}, // this.props.riverData
			featureId:null,
			features:[],
			markerLng:null,
			markerLat:null	
		}
	}

	componentDidMount(){
		this.props.getRiver();
		this.props.loadProject();
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

	renderDrawOptions = () => {
		return (
			<Grid 
				container 
				wrap="nowrap" 
				justify="center" 
				alignItems="center" 
				style={{					
					position:'absolute',
					top:200,
					right:10
				}}>
				<IconButton>
					<LinearScale />
				</IconButton>
			</Grid>
		);
	}

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

	_onDrawUpdate = data => {
		if(data.action === 'move'){
			console.log(data.features);
			this.props.replaceCoordinatesProject(data.features);
		}
	}

	// ini yg dipake
	_onSelectProject = data => {
			console.log(data);
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

			}else{
					console.log('user selected condition #3!');	
					this.setState(state=>{
						return {
							featureId:null					
						}
					});			
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
			mapStyle } = this.props;

		return (
			<React.Fragment>
			<LoadingDialog isLoading = { isLoading } />
			<MapGL 
				{...viewport} 					
				accessToken = { mapConfig.token }
				mapStyle = { mapStyle }
				style = { { width: '100vw', height: '90vh' } }					
				onViewportChange = { viewport => this.handleViewportChange(viewport) }>

				{this.renderNavigationControl()}
				{this._renderMarkerinNewPoint()}
				{this.renderDrawOptions()}
				
				<Source 
					id="river" 
					type="geojson" 
					data={this.props.riverData} />

				<Layer 
					id="river" 
					type="line" 
					source="river" 
					paint={{ 
						'line-color': '#4ce0aa',
						'line-width': 3,
						'line-opacity':0.7
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