import { 
	call, put, all, takeLatest, 
	// takeEvery, 
	//select
	 } from 'redux-saga/effects';
import request from '../../utils/request';
import { api } from '../../environtments';

import { 
	// GET_GEOJSON_ACTION,
	GET_OPTIONS_ACTION,
	GET_RIVER_ACTION,
	GET_PROJECT_ACTION,
	GET_PROJECT_ATTRIBUTE_ACTION,
	GET_RIVER_ATTRIBUTE_ACTION,
	ADD_RIVER_ACTION,
	ADD_PROJECT_ACTION,
	HAPUS_SUNGAI_ACTION,
	UPLOAD_PROJECT_ACTION,
	DOWNLOAD_EXPORT_ACTION,
	INSERT_RIVER_FEATURES,
	ADD_NEW_RIVER_ACTION,
	UPDATE_RIVER_PROPERTY_ACTION,
	GET_RIVER_ATTRIBUTE_BYID_ACTION,
	QUERY_PROPERTI_ACTION,
	REPLACE_MAP_ACTION,
	HAPUS_PROJECT_ACTION,
	GET_DOWNLOAD_FILES,
	REPLACE_COORD_ACTION,
	DELETE_UPLOAD_ACTION,
	DELETE_UPLOAD_SUCCESS_ACTION,
	DELETE_UPLOAD_ERROR_ACTION
} from './constants';

import { 
	//getGeojsonSuccessAction,
	// getRiverAttributeAction 
	getOptionsSuccessAction,
	getRiverAction,
	getRiverSuccessAction,
	getRiverFailedAction,
	setSnackbarAction,
	getRiverAttributeSuccessAction,
	getRiverAttributeFailAction,
	hapusSungaiSuccessAction,
	getProjectAttributeSuccessAction,
	getProjectAttributeFailAction,
	// getProjectAction,
	getProjectSuccessAction,
	getProjectFailedAction,
	uploadProjectSuccessAction,
	addProjectSuccessAction,
	// downloadExportAction,
	downloadExportSuccessAction,
	downloadExportErrorAction,
	// insertRiverFeaturesAction,
	insertRiverFeaturesSuccessAction,
	insertRiverFeaturesErrorAction,
	// AddNewRiverAction,
	AddNewRiverSuccessAction,
	AddNewRiverErrorAction,
	getRiverAttributeByIdSuccessAction,
	getRiverAttributeByIdFailAction,
	updateRiverPropertySuccessAction,
	updateRiverPropertyErrorAction,
	queryPropertiSuccessAction,
	queryPropertiErrorAction,
	replaceMapSuccessAction,
	replaceMapErrorAction,
	hapusProjectSuccessAction,
	hapusProjectErrorAction,
	replaceCoordinatesProjectSuccessAction,
	replaceCoordinatesProjectErrorAction,
	deleteUploadSuccessAction,
	deleteUploadErrorAction
} from './action';

// import { makeSelectRiverFeatures } from './selectors'

import {
	mapOptionsResponseToDisplay
} from './helpers';


export function* getDownloadFiles(action){
	try{
		const data = action.payload
		const endpoint = `${api.host}/api/geojson/download/${data}`;
		const requestOpt = {
			method:'GET'  
		};

		const response = yield call(request, endpoint, requestOpt);
		if(response.data){
			let blob = response.data.blob();
			console.log(blob);
		} 
		
	}catch(err){
		if(err){
			console.log(err.message)
		}
	}
}

// REPLACE MAP SUNGAI (18/07/2019)
export function* replaceMap(action){
	try{
		const data = action.payload
		const endpoint = `${api.host}/api/geojson/sungai/replaceMap`;
		const requestOpt = {
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data
	    })	    
		};
		const response = yield call(request, endpoint, requestOpt);
		console.log(action.payload);
		return response;
		/*if(response.status === 200){
			yield put(replaceMapSuccessAction())			
		}*/
	}catch(err){
		if(err){
			// console.log(err.message)
			yield put(replaceMapErrorAction())
		}
	}
}

// REPLACE COORD PROJECT (22/07/2019)
export function* replaceCoordProject(action){
	try{
		const data = action.payload;
		const endpoint = `${api.host}/api/geojson/project/replaceCoordinate`;
		const requestOpt = {
			method:'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({data})	    
		};

		const response = yield call(request, endpoint, requestOpt);		
		if(response.status === 200){
			yield put(replaceCoordinatesProjectSuccessAction(response.data))
			yield getProject();
		}		

	}catch(err){
		if(err){
			// console.log(err.message);
			yield put(replaceCoordinatesProjectErrorAction(err.message))
		}
	}
}


// QUERY PROPERTI SUNGAI (18/07/2019)
export function* queryProperti(action){

	try{

		const endpoint = `${api.host}/api/geojson/sungai/queryProperti/${action.payload}`;
		const requestOpt = { method:'GET' }
		const response = yield call(request, endpoint, requestOpt);

		if(response.status === 200){
			yield put(queryPropertiSuccessAction(response.data))			
		}
	}catch(err){
		if(err){
			yield put(queryPropertiErrorAction()) 			
		}
	}
}

// tambah sungai baru (15/07/2019)
export function* AddNewRiver(action){
	try{
		const data = action.payload
		const endpoint = `${api.host}/api/geojson/sungai/addNew`;
		const requestOpt = {
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data
	    })	    
		};

		const response = yield call(request, endpoint, requestOpt);
		console.log('SAGA AddNewRiver response:',response);
		// yield put(AddNewRiverAction(action.	paylo))
		// yield put(AddNewRiverSuccessAction())
	}catch(err){
		if(err){
			yield put(AddNewRiverErrorAction('error tambah sungai baru!'))
		}
	}
}

// TODO
export function* updateRiverProperty(action){
	try{
		console.log('start SAGA updateRiverProperty :',action.payload);
		const endpoint = `${api.host}/api/geojson/sungai/updateProperty`;
		const requestOpt = {
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				featureId:action.payload.featureId,
				property:action.payload.property
	    })	    
		};
		const response = yield call(request, endpoint, requestOpt);
		console.log('saga update property response : ', response);
		yield put(updateRiverPropertySuccessAction());
	}catch(err){
		if(err) 
		yield put(updateRiverPropertyErrorAction())
	}
}

/*
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
 */




// insert river features action
export function* insertRiverFeatures(action){
	console.log('saga insertRiverFeatures :',action.payload);
	try{
		// yield put(insertRiverFeaturesAction(action.payload))		
		yield put(insertRiverFeaturesSuccessAction())		
	}catch(err){
		if(err){
			yield put(insertRiverFeaturesErrorAction());
			console.log('saga errors:',err.message);
		}
	}
}

// upload file
export function* uploadFile(file){
	const endpoint = `${api.host}/api/geojson/project/upload`;
	const formData = new FormData();
	// formData.append('project', file, file.name);
	formData.append('project', file.file);
	formData.append('projectId', file.projectId);
	const requestOpt = {
		method:'POST',
		body: formData
	}

	try{
		const response = yield call(request, endpoint, requestOpt);
		//console.log(response);
		return response.data;
	}catch(err){
		//console.log('uploadFile:',err);
		throw err;
	}
} 

export function* uploadProjectFile(action){
	const file = action.payload.files;
	const projectId = action.payload.id;
	// console.log('action paylod id:',action.payload.id)
	// TODO : kompress file
	try{
		// const responseData = yield uploadFile({ file, projectId });
		yield uploadFile({ file, projectId });
		// console.log('saga response upload:',responseData);
		yield put(uploadProjectSuccessAction());
	}catch(err){
		//console.log('uploadProjectFile:',err);
	}
}

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

export function* deleteUpload(action){
	console.log('saga deleteUpload ',action.payload);
	const filename = action.payload;
	const endpoint = `${api.host}/api/geojson/hapusUpload/${filename}`;
	const requestOpt = { method:'GET' }
	try{
		const response = yield call(request, endpoint, requestOpt);
		yield put(deleteUploadSuccessAction());
		// return response.data;
		console.log('saga deleteUpload :',response.data);

	}catch(err){
		throw err;	
		yield put(deleteUploadErrorAction());
	}	
}

// AMBIL SEMUA DATA AWAL PROJECT
export function* fetchProjectAttribute(action){
	// console.log(action.payload);
	const featureId = action.payload;
	const endpoint = `${api.host}/api/geojson/project/attribut/${featureId}`;
	const requestOpt = { method:'GET' }
	try{
		const response = yield call(request, endpoint, requestOpt);		
		const { id, nampro, tglpro, ketera } = response.data[0];
		const uploadedFiles = yield getUploadFiles(featureId);
		yield put(getProjectAttributeSuccessAction({ id, nampro, tglpro, ketera, upload:uploadedFiles }))
	}catch(err){
		const uploadedFiles = yield getUploadFiles(featureId);
		yield put(getProjectAttributeFailAction({
			id:"",
			nampro:"",
			tglpro:new Date().toISOString().substring(0, 10),
			ketera:"",
			upload:uploadedFiles
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
		yield put(getRiverSuccessAction(response.data))		
	}catch(err){
		yield put(getRiverFailedAction('Terjadi error saat mengambil data map!'))
		yield put(setSnackbarAction(true))		
	}
}

// add river
export function* addRiver(action){
	
	// let features = yield select(makeSelectRiverFeatures());
	console.log('saga add river payload: ', action.payload);
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
		//console.log('err:',err)
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
		yield put(getProjectSuccessAction(response.data))
		//console.log('getProject saga response:',response);
	}catch(err){
		yield put(getProjectFailedAction('Terjadi error saat mengambil data project!'))
		// yield put(setSnackbarAction(true))
		console.log('error on saga:',err)
	}
}

export function* addProject(action){
	//console.log('addProject:',action);
	
	let features = action.payload.features
	let properties = action.payload.properties
	const endpoint = `${api.host}/api/geojson/project/add`;
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
		// const response = yield call(request, endpoint, requestOpt);
		yield call(request, endpoint, requestOpt);
		//console.log('Add Project saga response:',response);
		yield put(addProjectSuccessAction());
	}catch(err){
		//console.log('err:',err)
	}	
	
}


// delete project by featureId
export function* hapusproject(action){

	let featureId = action.payload;
	const endpoint = `${api.host}/api/geojson/project/hapus`;
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
		if(response.data){
			yield put(hapusProjectSuccessAction())
			yield getProject();
		}
	}catch(err){
		if(err){
		yield put(hapusProjectErrorAction())	
		}
	}

}



export function* hapusRiver(action){
	//console.log(action);
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
		//console.log('saga response hapusRiver:', response);
		if(response.data){
			yield put(hapusSungaiSuccessAction());
			yield put(getRiverAction())
		}		
	}catch(err){
		//console.log('error saga:',err)
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

// ambil atribut/properti sungai berdasarkan id sungai
// ini memanggil data berdasarkan id sungai
// khusus data yang sudah ada property di database

export function* fetchRiverAttribute(action){
	console.log('saga fetchRiverAttribute by id sungai : ', action.payload);
	// const featureId = action.payload;
	const idsung = action.payload;
	const endpoint = `${api.host}/api/geojson/sungai/attribut/${idsung}`;
	const requestOpt = { method:'GET' }
	
	try{
		const response = yield call(request, endpoint, requestOpt);
		console.log('saga fetchRiverAttribute:',response);
		const idkecm = response.data[0].idkecm;
		const nmsung = response.data[0].nmsung;
		const jenis_sungai = response.data[0].jenis_sungai.toString();
		const keterangan = response.data[0].keterangan ? response.data[0].keterangan : '';
		const idsungai = response.data[0].idsung;

		yield put(getRiverAttributeSuccessAction({ kecamatan:idkecm, sungai:nmsung, jenis_sungai:jenis_sungai, keterangan:keterangan, idsung:idsungai }));

	}catch(err){
		console.log('error on saga:',err)
		yield put(getRiverAttributeFailAction({
			kecamatan:'',
			sungai:'',
			jenis_sungai:'1',
			keterangan:'',
			idsung:''
		}))
	}
}

// 

export function* fetchRiverAttributeById(action){
	console.log('start SAGA fetchRiverAttributeById :', action.payload);
	const featureId = action.payload;
	const endpoint = `${api.host}/api/geojson/sungai/attributById/${featureId}`;
	const requestOpt = { method:'GET' }	
	try{
		const response = yield call(request, endpoint, requestOpt);
		console.log('result SAGA fetchRiverAttributeById :', response);
		const idkecm = response.data[0].idkecm;
		const nmsung = response.data[0].nmsung;
		const jenis_sungai = response.data[0].jenis_sungai.toString();
		const keterangan = response.data[0].keterangan ? response.data[0].keterangan : '';
		const idsungai = response.data[0].idsung;

		yield put(getRiverAttributeByIdSuccessAction({ kecamatan:idkecm, sungai:nmsung, jenis_sungai:jenis_sungai, keterangan:keterangan, idsung:idsungai }));

	}catch(err){
		if(err)
			yield put(getRiverAttributeByIdFailAction({
				kecamatan:'',
				sungai:'',
				jenis_sungai:'1',
				keterangan:'',
				idsung:''
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
		// console.log('saga response getOptions:',response);
		if(response.status === 200){
			const data = response.data;
			const options = mapOptionsResponseToDisplay(optionKey,data);
			yield put(getOptionsSuccessAction(optionKey, options));
			// console.log(options);
		}
		
	}	catch(err){
		//console.log(err)
	}
}

export function* downloadExport(action){

	const fileNameToDownload = action.payload
	const endpoint = `${api.host}/api/geojson/download/${fileNameToDownload}`;
	const requestOpt = { method:'GET' }
	
	try{
		const response = yield call(request, endpoint, requestOpt);
		if(response.data){
			console.log('saga download : ',response.data);
			yield put(downloadExportSuccessAction(response.data))
		}
	}catch(err){
		if(err){
			yield put(downloadExportErrorAction(err.message));
		}
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
		takeLatest(ADD_PROJECT_ACTION, addProject),
		takeLatest(GET_PROJECT_ACTION, getProject),
		takeLatest(UPLOAD_PROJECT_ACTION, uploadProjectFile),
		takeLatest(DOWNLOAD_EXPORT_ACTION, downloadExport),
		takeLatest(INSERT_RIVER_FEATURES, insertRiverFeatures),
		takeLatest(ADD_NEW_RIVER_ACTION, AddNewRiver),
		takeLatest(UPDATE_RIVER_PROPERTY_ACTION, updateRiverProperty),
		takeLatest(GET_RIVER_ATTRIBUTE_BYID_ACTION, fetchRiverAttributeById),
		takeLatest(QUERY_PROPERTI_ACTION, queryProperti),
		takeLatest(REPLACE_MAP_ACTION, replaceMap),
		takeLatest(HAPUS_PROJECT_ACTION, hapusproject),
		takeLatest(GET_DOWNLOAD_FILES, getDownloadFiles),
		takeLatest(REPLACE_COORD_ACTION, replaceCoordProject),
		takeLatest(DELETE_UPLOAD_ACTION, deleteUpload)
		//addRiver(),
		//takeLatest(GET_GEOJSON_ACTION, getGeojson)
	]);
}