import React from 'react'
import PropTypes from 'prop-types';
import MapGL, { NavigationControl, FullscreenControl} from '@urbica/react-map-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import Draw from '@urbica/react-map-gl-draw';
import LoadingDialog from '../../components/LoadingDialog';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';

// action
import { 
	getRiverAction,
	changeViewportAction,
	queryPropertiAction,
	updateFeaturesAction,
	replaceMapAction
} from './action'

// selector
import { 	
	makeSelectLoading,
	makeSelectMapConfig,
	makeSelectMapViewport,
	makeSelectMapStyle,
	makeSelectRiverData,
	//selectFeatures,
	//makeSelectDASMode,
	// makeSelectUpdatedFeatures
} from './selectors';

class DrawRiverShape extends React.Component {	

	componentDidMount(){
		this.props.getRiver();
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

	renderNavigationControl = () => {
		return (
			<React.Fragment>
				<NavigationControl showZoom position='bottom-right' />
				<FullscreenControl position='bottom-right' />
			</React.Fragment>
		);
	}

	_onDrawUpdate = e => {
		if(e.action === "change_coordinates"){
			this.props.replaceMap(e.features);
			this.props.getRiver();
		}		
	}

	// _onSelectionChange = e => {
	// 	// console.log(e.features[0].properties.featureId);
	// 	// console.log('selectionChange');
	// 	// this.props.updateFeatures(e.features[0].properties.featureId);
	// 	if(e.features.length > 0){
	// 		// console.log(e.features);
	// 		const features = e.features;
	// 		const featureId = features[0].properties.featureId;
	// 		// console.log(featureId);
	// 		// this.props.queryProperti(featureId);			
	// 	}

	// }	
 
	render(){

		const { 
			isLoading, 
			viewport, 
			mapConfig, 
			mapStyle } = this.props;
		//
		//onChange={e=>console.log('edit_shape onChange :',e)}
		return (
			<React.Fragment>
				
				<LoadingDialog 
					isLoading = { isLoading } />

					<MapGL 
						ref = { this.mapGl }
						{...viewport} 					
						accessToken = { mapConfig.token }
						mapStyle = { mapStyle }
						style = { { width: '100vw', height: '90vh' } }					
						onViewportChange = { viewport => this.handleViewportChange(viewport) }>

						{this.renderNavigationControl()}

							<Draw 
								ref={ this.drawShapeRiver }
								data={ this.props.riverData }																
								onDrawUpdate={e=>this._onDrawUpdate(e)}
								lineStringControl={false}
								pointControl={false}
								combineFeaturesControl={false}
								uncombineFeaturesControl={false}
								trashControl={false}
								polygonControl={false} />						

					</MapGL>
			</React.Fragment>
		);
	}
}

DrawRiverShape.propTypes = {
	isLoading:PropTypes.bool,
	mapConfig:PropTypes.object.isRequired,
	viewport:PropTypes.object,
	mapStyle:PropTypes.object,
	riverData:PropTypes.object,
	getRiver:PropTypes.func.isRequired,
	changeViewport:PropTypes.func.isRequired,
	replaceMap:PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({	
	isLoading: makeSelectLoading(),
	mapConfig: makeSelectMapConfig(),	
	viewport: makeSelectMapViewport(),
	mapStyle: makeSelectMapStyle(),	
	riverData:makeSelectRiverData(),
	// lastFeature: selectFeatures(),
	// das_mode:makeSelectDASMode(),
	// SelectUpdatedFeatures: makeSelectUpdatedFeatures()
});

function mapDispatchToProps(dispatch){
	return {
		getRiver: () => dispatch(getRiverAction()),
		changeViewport: ({ latitude, longitude, zoom }) => dispatch(changeViewportAction({ latitude, longitude, zoom })),
		queryProperti: featureId => dispatch(queryPropertiAction(featureId)),
		updateFeatures: features => dispatch(updateFeaturesAction(features)),
		replaceMap: collection => dispatch(replaceMapAction(collection))
	}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'mapShapeSaga', saga });

export default compose(	
	withSaga,
	withConnect
)(DrawRiverShape);