import {
	fromJS,
	List,
	Map
} from 'immutable';

import {
	GET_PROJECT_ACTION,
	GET_PROJECT_SUCCESS_ACTION,
	GET_PROJECT_FAIL_ACTION,
	GET_RIVER_ACTION,
	GET_RIVER_SUCCESS_ACTION,
	GET_RIVER_FAIL_ACTION,
	GET_PROJECT_FILES_ACTION,
	GET_PROJECT_FILES_SUCCESS_ACTION,
	// GET_PROJECT_FILES_FAIL_ACTION,
	// GET_PROJECT_ATTRIBUTE_ACTION,
	GET_PROJECT_ATTRIBUTE_SUCCESS_ACTION,
	GET_PROJECT_ATTRIBUTE_FAIL_ACTION,
	CHANGE_VIEWPORT_ACTION
} from './constant';

export const initialState = fromJS({
		ui:{
			loading:false,
			snackbar:false
		},
		data:{
			proyek:{
				"type": "FeatureCollection",
      	"features": []
			},
			sungai:{
				"type": "FeatureCollection",
      	"features": []
			},
			gambar_proyek:{				
				files:[]
			},
			attribute:{
				proyek:{
					id:'',
					nampro:'',
					tglpro:'',
					ketera:'',
					lat:null,
					lng:null,
					upload:[]
				}
			}
		},
		map:{
			viewport:{
				latitude:-4.851693,
				longitude:119.494885,
				zoom:9,
				bearing: 0,
        pitch: 0
			},
			accessToken:'pk.eyJ1IjoiZGVuaXJhY2htYWRpIiwiYSI6ImNqdXptYTVoMzFhZWs0ZnMwbmI3dG00eWgifQ.tkFYtFMZwzujEkvtz9_Oiw'
		},
		error:{
			message:null
		}
})

function FinalMap(state=initialState, action){
	switch(action.type){
		case GET_PROJECT_ACTION:
			return state.setIn(['ui','loading'], true);
		case GET_PROJECT_SUCCESS_ACTION:
			return state.setIn(['ui','loading'], false).setIn(['data','proyek','features'], new List(action.payload));
		case GET_PROJECT_FAIL_ACTION:
			return state;
		case GET_RIVER_ACTION:
			return state.setIn(['ui','loading'], true);
		case GET_RIVER_SUCCESS_ACTION:
			return state.setIn(['ui','loading'], false).setIn(['data','sungai','features'], new List(action.payload));
		case GET_RIVER_FAIL_ACTION:
			return state;
		case GET_PROJECT_FILES_ACTION:
			return state.setIn(['ui','loading'], true);
		case GET_PROJECT_FILES_SUCCESS_ACTION:{			
			return state.setIn(['ui','loading'], false).setIn(['data','gambar_proyek','files'], new List(action.payload));			
		}
		case GET_PROJECT_ATTRIBUTE_FAIL_ACTION:
			return state.setIn(['data','attribute','proyek'], new Map(action.payload))
		case GET_PROJECT_ATTRIBUTE_SUCCESS_ACTION:
			return state.setIn(['data','attribute','proyek'], new Map(action.payload))
		
		// viewport
		case CHANGE_VIEWPORT_ACTION:
			return state.setIn(['map','viewport'], new Map(action.payload))
		default:
			return state;
	}
}

export default FinalMap;