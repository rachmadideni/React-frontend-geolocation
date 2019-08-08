// combine all reducers and export it

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from './utils/history';
import globalReducer from './containers/App/reducer';
import mapContainer from './containers/Map/reducer';
import uploadShape from './containers/UploadShapePage/reducer';

export default function createReducer(injectedReducers = {}){
	const rootReducer = combineReducers({
		global:globalReducer,
		router:connectRouter(history),
		mapContainer, 
		uploadShape,
		...injectedReducers
	});

	// wrap root reducer & return new root reducer with router state
	// const mergeWithRouterState = connectRouter(history);
	// return mergeWithRouterState(rootReducer);
	return rootReducer;
}