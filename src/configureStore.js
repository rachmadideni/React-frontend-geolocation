//  Create Store with dynamic reducers
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers'; // root reducer
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState={},history){
	const middlewares = [sagaMiddleware, routerMiddleware(history)];
	const enhancers = [applyMiddleware(...middlewares)];
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
	const store = createStore(createReducer(),fromJS(initialState),composeEnhancers(...enhancers));
	store.runSaga = sagaMiddleware.run;
	store.injectedReducers = {}
	store.injectedSagas = {}
	return store;
}