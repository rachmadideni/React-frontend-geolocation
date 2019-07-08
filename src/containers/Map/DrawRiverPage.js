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
	changeViewportAction } from './action'
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

class DrawRiverPage extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			featureId: null,
			features: []
		}
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

	getRiverAttributes = data => {

		// console.log(data.features);
				
		if (data.features.length > 0){			
			let props = data.features.map(item=>item.properties);
			let featureId = props.featureId;
			
			if (props[0].hasOwnProperty('nmsung')) {				
				return true;
			}
			else{
				return false;	
			}

		}

		return false;

	}


	render(){
		const { isLoading, mapConfig, viewport, mapStyle } = this.props;
		return (
			<React.Fragment>
				<LoadingDialog isLoading = { isLoading } />
				<MapGL 
					{...viewport} 					
					accessToken = { mapConfig.token }
					mapStyle = { mapStyle }
					style={{ width: '100vw', height: '90vh' }}										
					onViewportChange={vp=>this.handleViewportChange(vp)}>
					{this.renderNavigationControl()}

					<Draw 
						data={this.props.riverData}
						onChange = { value => console.log(value) }
						onDrawSelectionChange = { data => this.getRiverAttributes(data) } />

					<FormRiver />

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
	}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'mapSaga', saga });

export default compose(	
	withSaga,
	withConnect
)(DrawRiverPage);