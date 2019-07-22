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
	getRiverAttributeAction,
	getRiverAttributeFailAction,
	updateGeodataRiver,
	insertRiverFeaturesAction,
	clearRiverFormAction,
	AddNewRiverAction,
	getRiverAttributeByIdAction
} from './action'

// selector
import { 	
	makeSelectLoading,
	makeSelectMapConfig,
	makeSelectMapViewport,
	makeSelectMapStyle,
	makeSelectRiverData,
	selectFeatures,
	makeSelectDASMode
	 } from './selectors';

// component
import LoadingDialog from '../../components/LoadingDialog';
import FormRiver from './FormLayer/FormRiverAttributes';

// utils
// import _ from 'lodash';
// import Tour from 'reactour'
// import { contentStyle, CustomHelper } from './FormLayer/TourBadgeRiver';



class DrawRiverPage extends React.Component {
	
	constructor(props){
		super(props);

		/*const tourConfig = [
      {
        id: 1,
        selector: '[data-id="form"]',
        content: [],
        position: 'top',        
        stepInteraction: false,
      },
    ];*/    

		this.state = {			
			// idsung: null,			
			collection:{},
			features:[],
			feature:{},
			featureId:null,
			isFormOpen:false,
			// steps:tourConfig
		}
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


	_onSelectedRiver = data => {
		// ekstrak features (array) dari data
		const { features } = data;		
		console.log('onselect features:',features);
		if(features.length > 0){
			
			if(!this.state.isFormOpen){
				this._handleFormOpen(true);
			}
			
			this.props.clearRiverForm();
			
			if (features[0].properties.hasOwnProperty('idsung')) {							
				this.setState({
					featureId:features[0].properties.featureId
					// featureId:features[0].id
				});
				return this.props.getRiverAttribute(features[0].properties.idsung);											
			} else {
				
				// handle fetch
				console.log('ByID')

				this.setState({
					featureId:features[0].properties.featureId
					//featureId:features[0].id
				});

				return this.props.getRiverAttributeById(features[0].properties.featureId);
			}
			
		}else{
			this._handleFormOpen(false);
		}
	}

	_onDrawCreate = data => {
		
		console.log('_onDrawCreate : ', data);
		
		if(data.features.length > 0){
			
			let features = data.features[0];
			this.props.insertRiverFeatures(features);
			
			const lastFeatureData = this.props.lastFeature.slice(-1);

			// run saga (input sungai tanpa informasi properti)
			this.props.AddNewRiver(lastFeatureData);

			// set id ke state featureId
			let featureId = data.features[0].id;
			this.setState((state,props)=> {
				return {
					featureId,
					features:data.features
				}
			});
			this.props.getRiver();
			// this.props.clearRiverForm(); // kosongkan form & clear state form > river 
			// this._handleFormOpen(true); // tampilkan form			
		}
	}

	_handleFormOpen = (status) => {
		this.setState({
			isFormOpen:status
		})
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
					style = {{ width: '100vw', height: '90vh' }}					
					onViewportChange = { viewport => this.handleViewportChange(viewport) }>
					
					{
						this.renderNavigationControl()						
					}
						
					<Draw 						
						data = { this.props.riverData }						
						onDrawSelectionChange = { data => this._onSelectedRiver(data) } 
						onDrawCreate={ data => this._onDrawCreate(data) } 
						displayControlsDefault={false}
						lineStringControl={true}
						trashControl={false}
						polygonControl={false}
						combineFeaturesControl={false}
						uncombineFeaturesControl={false} 
						pointControl={false} />																			
						
					<FormRiver 
						data-id="form" 
						featureId = { this.state.featureId }
						idsung = { this.state.idsung }
						features = {this.state.features} 
						isFormOpen={this.state.isFormOpen}
						handleFormOpen={this._handleFormOpen}
						clearRiverForm={this.props.clearRiverForm} />								

				</MapGL>					
			</React.Fragment>
		);
	}
}

DrawRiverPage.propTypes = {	
	isLoading: PropTypes.bool,
	mapConfig: PropTypes.object,
	viewport: PropTypes.object,
	getRiver: PropTypes.func,
	handleViewportChange: PropTypes.func,
	renderNavigationControl: PropTypes.func,
	changeViewport: PropTypes.func
}

const mapStateToProps = createStructuredSelector({	
	isLoading: makeSelectLoading(),
	mapConfig: makeSelectMapConfig(),	
	viewport: makeSelectMapViewport(),
	mapStyle: makeSelectMapStyle(),	
	riverData:makeSelectRiverData(),
	lastFeature: selectFeatures(),
	das_mode:makeSelectDASMode()
});

function mapDispatchToProps(dispatch){
	return {
		getRiver: () => dispatch(getRiverAction()),
		changeViewport: ({ latitude, longitude, zoom }) => dispatch(changeViewportAction({ latitude, longitude, zoom })),
		getRiverAttribute:idsung=>dispatch(getRiverAttributeAction(idsung)),
		getRiverAttributeFail: object => dispatch(getRiverAttributeFailAction(object)),
		updateGeodataRiver: geojson => dispatch(updateGeodataRiver(geojson)),
		insertRiverFeatures: features => dispatch(insertRiverFeaturesAction(features)),
		clearRiverForm: () => dispatch(clearRiverFormAction()),
		AddNewRiver: (collection)=> dispatch(AddNewRiverAction(collection)),
		getRiverAttributeById: (id)=>dispatch(getRiverAttributeByIdAction(id))
	}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'mapSaga', saga });

export default compose(	
	withSaga,
	withConnect
)(DrawRiverPage);