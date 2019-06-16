import { fromJS, List, Map } from 'immutable';

import {
	// CHANGE_MAP_MODE_ACTION,	
	CHANGE_TABVALUE_ACTION,
	CHANGE_VIEWPORT_ACTION,
	// GET_GEOJSON_ACTION,
	GET_GEOJSON_SUCCESS_ACTION,
	// PUT_MARKER_ACTION,
	PUT_MARKER_SUCCESS_ACTION,
	CLEAR_MARKER_SUCCESS_ACTION,
	CHANGE_MAP_STYLE,
	CHANGE_LAYER_VISIBILITY,
	CHANGE_DRAWER_STATE,
	CHANGE_DAS_MODE,
	GET_OPTIONS_SUCCESS_ACTION,
	SET_RIVER_PROP_ACTION,
	PUSH_RIVER_PROP_KEYVAL_ACTION,
	GET_RIVER_ACTION,
	GET_RIVER_SUCCESS_ACTION,
	GET_RIVER_FAILED_ACTION,
	SET_SNACKBAR_ACTION
} from './constants';

export const initialState = fromJS({
	config:{
		token:'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
		defaultZoom:12		
	},
	viewport:{
		latitude:-4.851693,
		longitude:119.494885,		
		zoom:9			
	},
	mapStyle:'mapbox://styles/mapbox/streets-v11',// light-v9
	layerVisibility:{
		kecamatan:false,
		sungai:true,
		project:false
	},
	isDrawerOpen:false,
	DASMODE:'EDIT',// enum : VIEW atau EDIT
	mode:'simple_select',
	tabValue:0,
	marker:[],
	options:{
		kecamatan:[]
	},
	features:[],
	geodata:{
		river:{
			"type": "FeatureCollection",
      "features": []
		},
		project:{
			"type": "FeatureCollection",
      "features": []
		},
		subDistrict:{
			"type": "FeatureCollection",
      "features": []
		}
	},
	loading:false,
	snackBarOpen:false,
	error:{
		message:null
	}
});

function mapContainerReducer(state = initialState, action){
	switch(action.type){		
		case PUSH_RIVER_PROP_KEYVAL_ACTION:{
				return state.setIn(['features',0,'properties'], new Map(action.payload));
		}
		case CHANGE_TABVALUE_ACTION:
			return state.set('tabValue',action.payload);
		// case CHANGE_MAP_MODE_ACTION:
		// 	return state;
		case CHANGE_VIEWPORT_ACTION:
			return state
			.setIn(['viewport','latitude'],action.payload.latitude)
			.setIn(['viewport','longitude'],action.payload.longitude)
			.setIn(['viewport','zoom'],action.payload.zoom)

		case GET_GEOJSON_SUCCESS_ACTION:			
			return state
			.setIn(['geojson_map',action.payload.key],action.payload.geojson);
		
		case PUT_MARKER_SUCCESS_ACTION:			
			// return state.updateIn(['marker','coordinates'], new List(action.payload));
			return state.update('marker', marker=>marker.push(...action.payload))
		
		case CLEAR_MARKER_SUCCESS_ACTION:
			return state.set('marker',new List())
		
		case CHANGE_MAP_STYLE:
			return state.set('mapStyle',action.payload);
		
		case CHANGE_LAYER_VISIBILITY:			
			return state
			.setIn(['layerVisibility','kecamatan'],action.payload.kecamatan)
			.setIn(['layerVisibility','sungai'],action.payload.sungai)
			.setIn(['layerVisibility','project'],action.payload.project)
		
		case CHANGE_DRAWER_STATE:
			return state.set('isDrawerOpen',action.payload)
		
		case CHANGE_DAS_MODE:
			return state.set('DASMODE',action.payload)
		
		case GET_OPTIONS_SUCCESS_ACTION:
			return state.setIn(
				['options',action.payload.key],
				action.payload.options)
		
		case SET_RIVER_PROP_ACTION:
			return state.update('features', features => features.push(...action.payload));

		case GET_RIVER_ACTION:
			return state.set('loading',true);
		case GET_RIVER_SUCCESS_ACTION:{
			// console.log('reducer action payload:', action.payload);
			// return state.setIn(['geodata','river','features'], new List(action.payload.features));
			return state.set('loading',false).setIn(['geodata','river','features'], new List(action.payload));
			//return state.updateIn(['geodata','river','features'], features => features.push(...action.payload));			
		}
		case GET_RIVER_FAILED_ACTION:
			return state
				.set('loading',false)
				.setIn(['error', 'message'], action.payload);

		case SET_SNACKBAR_ACTION:
			return state.set('snackBarOpen', action.payload);
		default:
			return state;
	}
}

export default mapContainerReducer;