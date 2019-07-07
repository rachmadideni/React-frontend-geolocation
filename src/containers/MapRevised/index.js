import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable';

import MapGL, { Marker, Popup } from 'react-map-gl';
import Pin from './component/Pin';
import PopupContent from './component/PopupContent';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
	data_proyek,
	data_sungai,
	data_upload,
	attribut_proyek,
	viewport
} from './selector';

import {
	getProjectAction,
	getRiverAction,
	getProjectFilesAction,
	getProjectAttributeAction,
	getProjectAttributeFailAction,
	changeViewportAction
} from './action';

import {
	changeDrawerStateAction
} from '../Map/action'

// style.json
import { defaultMapStyle, dataLayer } from '../../styles/map-style';
import _ from 'lodash'

// geocoder
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

class MapRevised extends Component {

	constructor(props){
		super(props);
		this.state = {
			mapStyle: defaultMapStyle,			
			hoveredFeature: null,	
	    viewport: {
	      width: 400,
	      height: 400,
	      latitude: -4.851693,
	      longitude: 119.494885,
	      zoom: 8
	    }
  
		}
	}

	mapRef = React.createRef()
	
	resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  

	componentDidMount(){
		this.props.getProject();
		this.props.getRiver();

		window.addEventListener('resize', this.resize)
    this.resize()

    /*const map = this.reactMap.getMap();    
    map.on('load', ()=> {
    	map.addLayer({
    		"id":"sung",
    		"type":"line",
    		"source":{
    			"type":"geojson",
    			"data":this.props.data_sungai
    		},
				"layout": {
				"line-join": "round",
				"line-cap": "round"
				},
				"paint": {					
					"line-color":"hsl(206, 88%, 43%)",
					"line-width":3
				}
    	});
    });*/      		 
	}

	componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

	_renderProyek = () => {
		const { features } = this.props.data_proyek;
		
		const {
			getProjectAttribute
		} = this.props;

		return features.map((item,index)=>{			
			const { coordinates } = item.geometry
			return (
				<Marker 
					key={`proyek-${index}`} 
					longitude={coordinates[0]} 
					latitude={coordinates[1]}>					
					<Pin onClick={ e=>getProjectAttribute(item.id)} />
				</Marker>	
			);
		});
	}

	componentDidUpdate(prevProps){

		if(_.isEqual(prevProps.data_sungai, this.props.data_sungai)){
			// console.log(JSON.stringify(this.props.data_sungai))	
		}else{
			this._load_data_sungai(this.props.data_sungai);
			// console.log(JSON.stringify(this.props.data_sungai))	
		}
	}

	_load_data_sungai = data => {	
		const mapStyle = 
		defaultMapStyle.setIn(['sources','incomeByState'], fromJS({type:'geojson',data}))
		.set('layers', defaultMapStyle.get('layers').push(dataLayer));
			
		this.setState({
			mapStyle:mapStyle
		})
	}

	_onHover = event => {
		const {
			features,
			srcEvent: {offsetX, offsetY}
		} = event;
		const hoveredFeature = features && features.find(f => f.layer.id === 'data_sungai');
		this.setState({ hoveredFeature, x: offsetX, y: offsetY});		
	}

	_renderTooltip() {
    
    const { 
    	hoveredFeature, 
    	x, 
    	y } = this.state;
    
    return (
      hoveredFeature && (
        <div 
        	className="tooltip" 
        	style={{ 
        		position: 'absolute',
        		margin: '8px',
  					padding: '12px',
  					background: 'rgba(0, 0, 0, 0.8)',
  					color: '#fff',
  					maxWidth: '300px',
  					fontSize: '12px',
  					zIndex: 9,
  					pointerEvents: 'none',
        		left: x,
        		top: y
        	}}>
          <div>Id: {hoveredFeature.properties.featureId}</div>
          <div>Sungai { hoveredFeature.properties.nmsung }</div>          
          <div>kecamatan { hoveredFeature.properties.nmkecm }</div>
        </div>
      )
    );
  }

	_renderPopup = () => {
		const { 
			getProjectAttributeFail,
			attribut_proyek } = this.props;		
		return (
			attribut_proyek.lat && (
				<Popup
					tipSize={5}
					longitude={attribut_proyek.lng} 
					latitude={attribut_proyek.lat}										
					anchor="top"
					closeOnClick={false}
					onClose={()=>getProjectAttributeFail()}>
					<PopupContent attribut_proyek={attribut_proyek} />
				</Popup>
			)
		)

	}

	_handleViewport = viewport => {
		this.props.changeViewport(viewport);
	}

	handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

	// if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

  // https://docs.mapbox.com/help/tutorials/local-search-geocoding-api/
  // https://docs.mapbox.com/mapbox-gl-js/example/forward-geocode-custom-data/
	_forwardGeocoder = (query) => {
		const { data_sungai } = this.props;
		if(data_sungai){
			var matchingFeatures = [];
			for (var i = 0; i < data_sungai.features.length; i++) {
					var feature = data_sungai.features[i];
					// handle queries with different capitalization than the source data by calling toLowerCase()
					if (feature.properties.nmsung.toLowerCase().search(query.toLowerCase()) !== -1) {
						// add a tree emoji as a prefix for custom data results
						// using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
						//feature['place_name'] = '🌲 ' + feature.properties.title;
						feature['place_name'] = feature.properties.nmsung
						feature['nama_kecamatan'] = feature.properties.nmkecm
						feature['center'] = feature.geometry.coordinates[0];
						// feature['place_type'] = ['park'];
						matchingFeatures.push(feature);
					}
			}
			return matchingFeatures;			
		}
	}

	render(){
//ref={(reactMap) => this.reactMap = reactMap}
		const { mapStyle } = this.state;
		const { viewport } = this.props;
		return (
			<div style={{
				width:'100%',
				height:'100%'
			}}>

				<MapGL
					ref={this.mapRef}
					{...viewport}
					width={'100vw'}
					height={'90vh'}
					mapboxApiAccessToken={'pk.eyJ1IjoiZGVuaXJhY2htYWRpIiwiYSI6ImNqdXptYTVoMzFhZWs0ZnMwbmI3dG00eWgifQ.tkFYtFMZwzujEkvtz9_Oiw'}					
					mapStyle={mapStyle}
					onViewportChange = { viewport => this._handleViewport(viewport) }
					onHover={this._onHover}>					
					{this._renderProyek()}
					{this._renderPopup()}
					{this._renderTooltip()}

					<Geocoder
          	mapRef={this.mapRef}
          	onViewportChange={this.handleGeocoderViewportChange}
          	mapboxApiAccessToken={'pk.eyJ1IjoiZGVuaXJhY2htYWRpIiwiYSI6ImNqdXptYTVoMzFhZWs0ZnMwbmI3dG00eWgifQ.tkFYtFMZwzujEkvtz9_Oiw'} 
          	localGeocoder={this._forwardGeocoder}
          	placeholder="masukkan nama sungai" 
          	zoom={18}
          	reverseGeocode={true} />

				</MapGL>
			</div>
		);
	}


}
	// 			
	// mapStyle={'mapbox://styles/mapbox/streets-v11?optimize=true'}											
const mapStateToProps = createStructuredSelector({
	data_proyek: data_proyek(),
	data_sungai: data_sungai(),
	data_upload: data_upload(),
	attribut_proyek: attribut_proyek(),
	viewport: viewport()
})

const mapDispatchToProps = dispatch => {
	return {
		getProject: () => dispatch(getProjectAction()),
		getRiver: () => dispatch(getRiverAction()),
		getProjectFiles: value => dispatch(getProjectFilesAction(value)),
		getProjectAttribute: value=>dispatch(getProjectAttributeAction(value)),
		getProjectAttributeFail: () => dispatch(getProjectAttributeFailAction()),
		changeViewport: viewport => dispatch(changeViewportAction(viewport)),
		changeDrawerState: value=>dispatch(changeDrawerStateAction(value))		
	}
}

const withConnect = connect(mapStateToProps,mapDispatchToProps)
const withReducer = injectReducer({ key: 'finalMap', reducer });
const withSaga = injectSaga({ key: 'finalMapSaga', saga });

export default compose(withReducer,withSaga,withConnect)(MapRevised);