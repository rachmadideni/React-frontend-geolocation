import {
	call,
	put,
	all,
	takeLatest
} from 'redux-saga/effects';

import request from '../../utils/request';
import { api } from '../../environtments';

import {
	GET_PROJECT_ACTION,
	GET_PROJECT_FILES_ACTION,
	GET_RIVER_ACTION,
	GET_PROJECT_ATTRIBUTE_ACTION
} from './constant'

import {
	getProjectSuccessAction,
	getProjectFailAction,
	getProjectFilesSuccessAction,
	getProjectFilesFailAction,
	getRiverSuccessAction,
	getRiverFailAction,
	getProjectAttributeSuccessAction,
	getProjectAttributeFailAction
} from './action';

export function* getUploadFiles(featureId){	
	const endpoint = `${api.host}/api/geojson/project/getUploadFiles/${featureId}`;
	const requestOpt = { method:'GET' }
	try{
		const response = yield call(request, endpoint, requestOpt);
		return response.data;
	}catch(err){
		throw err;	
	}
}

export function* getProjectAttribute(action){
	// console.log(action.payload)
	const featureId = action.payload;
	const endpoint = `${api.host}/api/geojson/project/attribut/${featureId}`;
	const requestOpt = { 
		method:'GET',
		headers:{
			'Content-Type': 'application/json',
		}}

	try{
		const response = yield call(request, endpoint, requestOpt);		
		const { id, nampro, tglpro, ketera, lat, lng } = response.data[0];
		const uploadedFiles = yield getUploadFiles(featureId);
		yield put(getProjectAttributeSuccessAction({ id, nampro, tglpro, ketera, lat, lng, upload:uploadedFiles }))
	}catch(err){
		const uploadedFiles = yield getUploadFiles(featureId);
		yield put(getProjectAttributeFailAction({
			id:"",
			nampro:"",
			tglpro:"",
			ketera:"",
			lat:null,
			lng:null,
			upload:uploadedFiles
		}))
	}
}

export function* getProjectFiles(action){
	// console.log(action.featureId);
	const featureId = action.featureId;	
	const endpoint = `${api.host}/api/geojson/project/getUploadFiles/${featureId}`;
	const requestOpt = { 
		method:'GET',
		headers:{
			'Content-Type': 'application/json',
		}
	}

	try{
		const response = yield call(request, endpoint, requestOpt);
		// console.log('saga getProjectFiles : ',response.data);
		yield put(getProjectFilesSuccessAction(response.data))
	}catch(err){
		yield put(getProjectFilesFailAction())
		throw err;	
	}
}

export function* getProject(){
	const endpoint = `${api.host}/api/geojson/project/load`;	
	const requestOpt = { 
		method:'GET',
		headers:{
			'Content-Type': 'application/json',
		}
	};

	try{
		const response = yield call(request, endpoint, requestOpt);
		// console.log('saga proyek load:',response.data)
		yield put(getProjectSuccessAction(response.data));
	}catch(err){
		yield put(getProjectFailAction())
	}
}

/*export function* getRiverAttribute(featureId){	
	const endpoint = `${api.host}/api/geojson/sungai/attribut/${featureId}`;
	const requestOpt = { 
		method:'GET',
		headers:{
			'Content-Type': 'application/json',
		}
	};

	try{
		const response = yield call(request, endpoint, requestOpt);
		return response.data
	}catch(err){
		console.log(err)
	}
}*/

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
		yield put(getRiverSuccessAction(response.data))
		//const riverAttributes = yield getUploadFiles(getRiverAttribute);
	}catch(err){
		yield put(getRiverFailAction())		
	}
}

export default function* finalMapSaga(){
	yield all([
		takeLatest(GET_PROJECT_ACTION, getProject),
		takeLatest(GET_RIVER_ACTION, getRiver),
		takeLatest(GET_PROJECT_FILES_ACTION, getProjectFiles),
		takeLatest(GET_PROJECT_ATTRIBUTE_ACTION, getProjectAttribute)
	])
}
