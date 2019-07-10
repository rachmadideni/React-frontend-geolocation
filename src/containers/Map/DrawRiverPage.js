import React from 'react';
import PropTypes from 'prop-types';
import MapGL, { NavigationControl, FullscreenControl} from '@urbica/react-map-gl';
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
	changeViewportAction,
	updateGeodataRiver } from './action'

// selector
import { 
	makeSelectLayerVisibility,
	makeSelectLoading,
	makeSelectMapConfig,
	makeSelectMapViewport,
	makeSelectMapStyle,
	makeSelectRiverData
	 } from './selectors';

// component
import LoadingDialog from '../../components/LoadingDialog';
import FormRiver from './FormLayer/FormRiverAttributes';

// utils
import _ from 'lodash';

class DrawRiverPage extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			featureId: null,
			features: [],
			temp_collection: this.props.riverData,
			idsung: null,
			mode:'simple_select'
		}
		this.drawComp = React.createRef();
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

	componentDidMount(){	
		this.props.getRiver();
				
	}

	componentDidUpdate(){
		console.log(this.state.featureId);
	}

	_onDrawCreate = data => {
		if(data.features.length > 0){
			let featureId = data.features[0].id;
			this.setState({
				featureId,
				features:data.features
			})
		}
	}

	getRiverAttributes = data => {

		if (data.features.length > 0){
			
			let props = data.features[0].properties;
			let features = data.features;

			if (props.hasOwnProperty('nmsung')) {								
					
					let featureId = props.featureId;
					let idsung = props.idsung;
					
					this.setState({
						featureId,
						features,
						idsung
					});

			}

			/*else {
				
					// deteksi sungai baru		
					let featureId2 = data.features[0].id;
					// console.log('tdk ada prop nmsung:', featureId2);
					this.setState({
						featureId:featureId2,
						features,
						idsung:null
					});

			}*/

		}else{
			// we do this to automatically reset the from previously fileed with data			
			this.setState({
				featureId: null,
				// idsung:null
			})
		}
	}

	_onChange = geojson => {
		
	}


	render(){
		const { isLoading, mapConfig, viewport, mapStyle } = this.props;
		return (
			<React.Fragment>
				<LoadingDialog 
					isLoading = { isLoading } />
				
				<MapGL 
					{...viewport} 					
					accessToken = { mapConfig.token }
					mapStyle = { mapStyle }
					style={{ width: '100vw', height: '90vh' }}										
					onViewportChange={vp=>this.handleViewportChange(vp)}>
					
					{this.renderNavigationControl()}

					<div style={{ position:'absolute',top:10,left:500,bottom:0 }}>
						{/*JSON.stringify(this.state.temp_collection)*/}
					</div>
					
					<Draw 
						ref = { this.drawComp }
						data = { this.props.riverData }
						onChange = { geojson => this.props.updateGeodataRiver(geojson) }
						onDrawSelectionChange = { data => this.getRiverAttributes(data) } 
						onDrawCreate={ data => this._onDrawCreate(data) }/>

					<FormRiver 
						featureId = { this.state.featureId }
						idsung = { this.state.idsung }
						features = {this.state.features}  />

				</MapGL>					
			</React.Fragment>
		);
	}
}

DrawRiverPage.propTypes = {
	layerVisibility: PropTypes.object,
	isLoading: PropTypes.bool,
	mapConfig: PropTypes.object,
	viewport: PropTypes.object,
	getRiver: PropTypes.func,
	handleViewportChange: PropTypes.func,
	renderNavigationControl: PropTypes.func,
	changeViewport: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
	layerVisibility: makeSelectLayerVisibility(),
	isLoading: makeSelectLoading(),
	mapConfig: makeSelectMapConfig(),
	viewport: makeSelectMapViewport(),
	mapStyle: makeSelectMapStyle(),
	riverData:makeSelectRiverData(),
});

function mapDispatchToProps(dispatch){
	return {
		getRiver: () => dispatch(getRiverAction()),
		changeViewport: ({ latitude, longitude, zoom }) => dispatch(changeViewportAction({ latitude, longitude, zoom })),
		updateGeodataRiver: geojson => dispatch(updateGeodataRiver(geojson)),
	}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'mapSaga', saga });

export default compose(	
	withSaga,
	withConnect
)(DrawRiverPage);