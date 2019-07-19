import React from 'react';
import PropTypes from 'prop-types';
import MapGL, { Source, Layer, NavigationControl, FullscreenControl } from '@urbica/react-map-gl';
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
	getProjectAction,
	changeViewportAction
} from './action'

// selector
import {
	makeSelectRiverData,
	makeSelectProjectData,
	makeSelectLoading,
	makeSelectMapConfig,
	makeSelectMapViewport,
	makeSelectMapStyle
} from './selectors';

// component
import LoadingDialog from '../../components/LoadingDialog';
import FormProject from './FormLayer/FormProject';

// utils
import _ from 'lodash';

class DrawProjectPage extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			// project:{}, // this.props.projectData
			// river:{}, // this.props.riverData
			featureId:null,
			features:[]	
		}
	}

	componentDidMount(){
		this.props.getRiver();
		this.props.getProject();
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

	// syntax : componentDidUpdate(prevProps, prevState, snapshot)
	componentDidUpdate(prevProps, prevState){
			
		// console.log(prevProps.projectData); // props turunan atau dari redux
		// console.log(prevState.project); // previous state
		
		if(prevState.project !== prevProps.projectData){
			console.log('tdk sama');
			// this.setState({
			// 	project: prevProps.projectData,
   //  		river: prevProps.riverData
			// })
		}else{
			// console.log('props dan state project === sama');			
		}
	}

	_onSelectedProject = data => {
		if(data.features.length >0){
			const currentProperties = data.features[0].properties;
			const featureId = data.features[0].id;
			const features = data.features;
			if(currentProperties.hasOwnProperty('nampro')){
				// user memilih point yg sdh ada datanya
				// console.log('kondisi 1')
				this.setState(state=>{
					return {
						featureId,
						features
					}
				});
			}else{
				// user mengklik point yang baru dibuat. setelah mengklik luar map
				// console.log('kondisi 2')
				this.setState(state=>{
					return {
						featureId,
						features
					}
				});
			}
		}else{
			// jika user mengklik pada map
			// console.log('kondisi 3')
			this.setState(state=>{
				return {
					featureId:null
				}
			});
		}
	}

	_updateCollection = collection => {
		this.setState((state,props)=>{
			// console.log(state);
			return{
				project:collection
			}
		})
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
				
				<Source 
					id="river" 
					type="geojson" 
					data={this.props.riverData} />

				<Layer 
					id="river" 
					type="line" 
					source="river" 
					paint={{ 
						'line-color': '#3bb2d0',
						'line-width': 3 }} />

				<FormProject 
					featureId={this.state.featureId} 
					features={this.state.features} />
				
				<Draw 
					data={this.props.projectData} 
					onChange={collection=>this._updateCollection(collection)} 
					onDrawSelectionChange={data=>this._onSelectedProject(data)} />

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
});

function mapDispatchToProps(dispatch){
	return {
		getRiver: () => dispatch(getRiverAction()),
		getProject: () => dispatch(getProjectAction()),
		changeViewport: ({ latitude, longitude, zoom }) => dispatch(changeViewportAction({ latitude, longitude, zoom })),		
	}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'mapProjectSaga', saga });

export default compose(withSaga, withConnect)(DrawProjectPage);