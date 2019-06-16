import { 
	call, put, all, takeLatest, 
	// takeEvery, 
	select } from 'redux-saga/effects';
import request from '../../utils/request';
import { api } from '../../environtments';

import { 
	// GET_GEOJSON_ACTION,
	GET_OPTIONS_ACTION,
	ADD_RIVER_ACTION,
	GET_RIVER_ATTRIBUTE_ACTION,
	GET_RIVER_ACTION
} from './constants';

import { 
	//getGeojsonSuccessAction,
	// getRiverAttributeAction 
	getOptionsSuccessAction,
	getRiverSuccessAction,
	getRiverFailedAction,
	setSnackbarAction
} from './action';

import { makeSelectRiverFeatures } from './selectors'

import {
	mapOptionsResponseToDisplay
} from './helpers';

// ambil data awal sungai 
export function* getRiver(){	
	const endpoint = `${api.host}/api/geojson/load/river`;
	const requestOpt = { 
		method:'GET',
		headers:{
			'Content-Type': 'application/json',
		}
	};

	try{		
		const response = yield call(request, endpoint, requestOpt);
		yield put(getRiverSuccessAction(response))
		// console.log('saga response:',response);
	}catch(err){
		yield put(getRiverFailedAction('Terjadi error saat mengambil data map!'))
		yield put(setSnackbarAction(true))
		// console.log('error on saga:',err)
	}
}

// add river
export function* addRiver(){
	
	let features = yield select(makeSelectRiverFeatures());	
	const endpoint = `${api.host}/api/geojson/sungai/add`;
	const requestOpt = {
		method:'POST',
		headers: {
  		'Content-Type': 'application/json',      
    },
		body: JSON.stringify({
      features
    })	    
	};

	try{
		const response = yield call(request, endpoint, requestOpt);
		console.log('saga response:',response.response.data);
		return response.response.data;
	}catch(err){
		console.log('err:',err)
	}
}

/*export function* getGeojson(action){
	
	const key = action.payload;
	// console.log(key);
	const endpoint = `http://192.168.43.204:3001/api/geojson/sungai`
	const requestOpt = {
		method:'GET'
	}

	try{
		const response = yield call(request, endpoint, requestOpt);
		// console.log(response);		
		if(response.http_code === 200){
			const geojson = response.response.geojsondata;
			// console.log(geojson);
			yield put(getGeojsonSuccessAction(key,geojson));
		}
	}catch(error){

	}
}*/

// ambil attribut sungai
export function* fetchRiverAttribute(action){
	console.log(action);
	const featureId = action.payload;
	const endpoint = `${api.host}/api/geojson/sungai/attribut/${featureId}`;
	const requestOpt = { method:'GET' }
	try{
		const response = yield call(request, endpoint, requestOpt);
		console.log('saga fetchRiverAttribute:',response);
	}catch(err){
		console.log('error on saga:',err)
	}
}

export function* getOptions(action){
	// todo : select token first
	const optionKey = action.payload;	
	const endpoint = `${api.host}/api/options/${optionKey}`;
	const requestOpt = { method:'GET' }

	try{
		const response = yield call(request,endpoint, requestOpt);
		// console.log('saga response:',response);
		if(response.http_code === 200){
			const data = response.data;
			const options = mapOptionsResponseToDisplay(optionKey,data);
			yield put(getOptionsSuccessAction(optionKey, options));
			// console.log(options);
		}
		
	}	catch(err){
		console.log(err)
	}

}

export default function* MapContainerSaga(){
	yield all([
		takeLatest(ADD_RIVER_ACTION, addRiver), // test
		takeLatest(GET_OPTIONS_ACTION, getOptions),
		takeLatest(GET_RIVER_ATTRIBUTE_ACTION, fetchRiverAttribute),
		takeLatest(GET_RIVER_ACTION, getRiver),
		//addRiver(),
		//takeLatest(GET_GEOJSON_ACTION, getGeojson)
	]);
}