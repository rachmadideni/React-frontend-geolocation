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
	GET_RIVER_ACTION,
	HAPUS_SUNGAI_ACTION,
	GET_PROJECT_ATTRIBUTE_ACTION,
	ADD_PROJECT_ACTION
} from './constants';

import { 
	//getGeojsonSuccessAction,
	// getRiverAttributeAction 
	getOptionsSuccessAction,
	getRiverSuccessAction,
	getRiverFailedAction,
	setSnackbarAction,
	getRiverAttributeSuccessAction,
	getRiverAttributeFailAction,
	hapusSungaiSuccessAction,
	getProjectAttributeSuccessAction,
	getProjectAttributeFailAction
} from './action';

import { makeSelectRiverFeatures } from './selectors'

import {
	mapOptionsResponseToDisplay
} from './helpers';

// AMBIL SEMUA DATA AWAL PROJECT
export function* fetchProjectAttribute(action){
	// console.log(action.payload);
	const featureId = action.payload;
	const endpoint = `${api.host}/api/project/geojson/attribut/${featureId}`;
	const requestOpt = { method:'GET' }
	try{
		const response = yield call(request, endpoint, requestOpt);
		console.log('saga fetchAttribute Project:',response);
		const { nampro, tglpro, ketera } = response
		yield put(getProjectAttributeSuccessAction({ nampro, tglpro, ketera }))
	}catch(err){
		yield put(getProjectAttributeFailAction({
			nampro:"",
			tglpro:"",
			ketera:""
		}));
		yield put(setSnackbarAction(true))
	}
}

/*

export function* fetchRiverAttribute(action){
	console.log(action);
	const featureId = action.payload;
	const endpoint = `${api.host}/api/geojson/sungai/attribut/${featureId}`;
	const requestOpt = { method:'GET' }
	try{
		const response = yield call(request, endpoint, requestOpt);
		console.log('saga fetchRiverAttribute:',response);

		// ubah response object agar sesuai dengan kolom di tabel
		const { 
			idkecm:kecamatan,
			nmsung:sungai,
			jenis_sungai,
			keterangan } = response;
			let jenis_sungai_string = jenis_sungai.toString();
		yield put(getRiverAttributeSuccessAction({ kecamatan, sungai, jenis_sungai:jenis_sungai_string, keterangan }));
	}catch(err){
		console.log('error on saga:',err)
		yield put(getRiverAttributeFailAction({
			kecamatan:'',
			sungai:'',
			jenis_sungai:'1',
			keterangan:''
		}))
	}
}

 */

// ambil semua data awal sungai 
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
export function* addRiver(action){
	
	// let features = yield select(makeSelectRiverFeatures());
	console.log(action);
	let features = action.payload.features
	let properties = action.payload.properties	
	const endpoint = `${api.host}/api/geojson/sungai/add`;
	const requestOpt = {
		method:'POST',
		headers: {
  		'Content-Type': 'application/json',      
    },
		body: JSON.stringify({
      features,
      properties
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

export function* addProject(action){
	console.log('addProject:',action);
	let features = action.payload.features
	let properties = action.payload.properties	
	const endpoint = `${api.host}/api/project/geojson/add`;
	const requestOpt = {
		method:'POST',
		headers: {
  		'Content-Type': 'application/json',      
    },
		body: JSON.stringify({
      features,
      properties
    })	    
	};

	try{
		const response = yield call(request, endpoint, requestOpt);
		console.log('saga response:',response);
		// return response
		return response.response.data;
	}catch(err){
		console.log('err:',err)
	}	
}

export function* hapusRiver(action){
	console.log(action);
	let featureId = action.payload;
	const endpoint = `${api.host}/api/geojson/sungai/hapus`;
	const requestOpt = {
		method:'POST',
		headers: {
  		'Content-Type': 'application/json',      
    },
		body: JSON.stringify({
      featureId
    })
	};
	try{
		const response = yield call(request, endpoint, requestOpt);
		if(response){
			yield put(hapusSungaiSuccessAction());
		}
		console.log('saga hapus sungai response',response);
	}catch(err){
		console.log('error saga:',err)
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

// ambil atribut/properti sungai berdasarkan featureId
export function* fetchRiverAttribute(action){
	console.log(action);
	const featureId = action.payload;
	const endpoint = `${api.host}/api/geojson/sungai/attribut/${featureId}`;
	const requestOpt = { method:'GET' }
	try{
		const response = yield call(request, endpoint, requestOpt);
		console.log('saga fetchRiverAttribute:',response);

		// ubah response object agar sesuai dengan kolom di tabel
		const { 
			idkecm:kecamatan,
			nmsung:sungai,
			jenis_sungai,
			keterangan } = response;
			let jenis_sungai_string = jenis_sungai.toString();
		yield put(getRiverAttributeSuccessAction({ kecamatan, sungai, jenis_sungai:jenis_sungai_string, keterangan }));
	}catch(err){
		console.log('error on saga:',err)
		yield put(getRiverAttributeFailAction({
			kecamatan:'',
			sungai:'',
			jenis_sungai:'1',
			keterangan:''
		}))
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
		takeLatest(HAPUS_SUNGAI_ACTION, hapusRiver),
		takeLatest(GET_PROJECT_ATTRIBUTE_ACTION, fetchProjectAttribute),
		takeLatest(ADD_PROJECT_ACTION, addProject)
		//addRiver(),
		//takeLatest(GET_GEOJSON_ACTION, getGeojson)
	]);
}