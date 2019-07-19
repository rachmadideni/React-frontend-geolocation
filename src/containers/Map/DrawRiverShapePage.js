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
	selectFeatures,
	makeSelectDASMode,
	makeSelectUpdatedFeatures
} from './selectors';

import * as turf from '@turf/meta'

class DrawRiverShape extends React.Component {
	constructor(props){
		super(props);
	}

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
		
		console.log(e.action === "change_coordinates" )
		
		if(e.action === "change_coordinates"){
			// this.props.updateFeatures(e.features[0].properties.featureId);
			// console.log(e.features);
			this.props.replaceMap(e.features);
		}
			// jika features sdh ada do nothing
			// jika features belum ada update api call (hapus data dan upload yg baru)

			/*
			
			"features": [{
          "id":"1",
          "type": "Feature",
          "geometry": {
          	"type": "LineString",
      		"coordinates": [
          	[119.59022000,-4.85900194],
          	[119.58540944,-4.86026750],
          	[119.58148222,-4.86365306]
          ]},
          "properties": {
              "idkecm": 1,
              "nmkecm": "minasa",
              "idsung": 1,
              "nmsung": "Salo Maleleng"
          }
      }]
			 */

		
	}

	_onSelectionChange = e => {
		// console.log(e.features[0].properties.featureId);
		// console.log('selectionChange');
		// this.props.updateFeatures(e.features[0].properties.featureId);
		if(e.features.length > 0){
			// console.log(e.features);
			const features = e.features;
			const featureId = features[0].properties.featureId;
			console.log(featureId);
			// this.props.queryProperti(featureId);			
		}

		/*turf.geomEach(features, (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)=>{
			console.log(currentGeometry);
			console.log(featureProperties);
			console.log(featureBBox);
			console.log(featureId);
		});*/

		// turf.getGeom(point)

		/*turf.featureEach(features, function (currentFeature, featureIndex) {
		  console.log(currentFeature);
		  console.log(featureIndex);
		});*/
	}

	_onChange = e => {
		// console.log('onCHange:',e);
		
	}
 
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
								
								onDrawSelectionChange = { e=>this._onSelectionChange(e) }								
								onDrawUpdate={e=>this._onDrawUpdate(e)}
								onChange={e=>this._onChange(e)}

								trashControl={false}
								polygonControl={false}
								lineStringControl={false}
								pointControl={false}
								combineFeaturesControl={false}
								uncombineFeaturesControl={false} 
								 />
						

					</MapGL>
			</React.Fragment>
		);
	}
}

const mapStateToProps = createStructuredSelector({	
	isLoading: makeSelectLoading(),
	mapConfig: makeSelectMapConfig(),	
	viewport: makeSelectMapViewport(),
	mapStyle: makeSelectMapStyle(),	
	riverData:makeSelectRiverData(),
	lastFeature: selectFeatures(),
	das_mode:makeSelectDASMode(),
	SelectUpdatedFeatures: makeSelectUpdatedFeatures()
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