import { call, put, all, takeLatest	} from 'redux-saga/effects';
import request from '../../utils/request';
import { api } from '../../environtments';

import { 
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
	// DELETE_UPLOAD_SUCCESS_ACTION,
	// DELETE_UPLOAD_ERROR_ACTION,
	INSERT_PROJECT_FEATURES_ACTION,
	// BARU
	ADD_NEW_PROJECT_ACTION,
	ADD_PROJECT_PROPERTIES_ACTION,
	GET_PROJECT_PROPERTIES_ACTION,
	LOAD_PROJECT_ACTION,
	GET_MARKER_OPTIONS_ACTION
} from './constants';

import {  
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
	getProjectSuccessAction,
	getProjectFailedAction,
	uploadProjectSuccessAction,
	addProjectSuccessAction,
	downloadExportSuccessAction,
	downloadExportErrorAction,
	insertRiverFeaturesSuccessAction,
	insertRiverFeaturesErrorAction,
	// AddNewRiverSuccessAction,
	AddNewRiverErrorAction,
	getRiverAttributeByIdSuccessAction,
	getRiverAttributeByIdFailAction,
	updateRiverPropertySuccessAction,
	updateRiverPropertyErrorAction,
	queryPropertiSuccessAction,
	queryPropertiErrorAction,
	// replaceMapSuccessAction,
	replaceMapErrorAction,
	hapusProjectSuccessAction,
	hapusProjectErrorAction,
	replaceCoordinatesProjectSuccessAction,
	replaceCoordinatesProjectErrorAction,
	deleteUploadSuccessAction,
	deleteUploadErrorAction,
	// BARU 
	// insertProjectFeaturesAction,
	insertProjectFeaturesSuccessAction,
	insertProjectFeaturesErrorAction,
	addNewProjectSuccessAction,
	getProjectPropertiesSuccessAction,
	getProjectPropertiesErrorAction,
	addProjectPropertiesSuccessAction,
	addProjectPropertiesErrorAction,
	loadProjectSuccessAction,
	loadProjectErrorAction,
	getMarkerOptionsSuccessAction
} from './action';

import { mapOptionsResponseToDisplay, mapMarkerOptions } from './helpers';


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
		return response;
		/*if(response.status === 200){
			yield put(replaceMapSuccessAction())			
		}*/
	}catch(err){
		if(err){
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

// insert river features action
export function* insertRiverFeatures(action){
	try{
		yield put(insertRiverFeaturesSuccessAction())		
	}catch(err){
		if(err){
			yield put(insertRiverFeaturesErrorAction());
		}
	}
}

// input project features action
export function* insertProjectFeatures(action){
	try{
		yield put(insertProjectFeaturesSuccessAction())
	}catch(err){
		if(err){
			yield put(insertProjectFeaturesErrorAction())
		}
	}
}

// upload file
export function* uploadFile(file){
	const endpoint = `${api.host}/api/geojson/project/upload`;
	const formData = new FormData();
	formData.append('project', file.file);
	formData.append('projectId', file.projectId);
	const requestOpt = {
		method:'POST',
		body: formData
	}

	try{
		const response = yield call(request, endpoint, requestOpt);
		return response.data;
	}catch(err){
		throw err;
	}
} 

export function* uploadProjectFile(action){
	const file = action.payload.files;
	const projectId = action.payload.id;
	// TODO : kompress file
	try{
		yield uploadFile({ file, projectId });
		yield put(uploadProjectSuccessAction());
	}catch(err){
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
	const filename = action.payload;
	const endpoint = `${api.host}/api/geojson/hapusUpload/${filename}`;
	const requestOpt = { method:'GET' }
	try{
		yield call(request, endpoint, requestOpt);
		yield put(deleteUploadSuccessAction());
	}catch(err){
		// throw err;	
		yield put(deleteUploadErrorAction());
	}	
}

// AMBIL SEMUA DATA AWAL PROJECT
export function* fetchProjectAttribute(action){

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
		return response.response.data;
	}catch(err){		
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
	}catch(err){
		yield put(getProjectFailedAction('Terjadi error saat mengambil data project!'))
	}
}

export function* loadProject(){
	const endpoint = `${api.host}/api/geojson/project/getAllProjectAttributes`;
	const requestOpt = { 
		method:'GET',
		headers:{
			'Content-Type': 'application/json',
		}
	};
	try{		
		const response = yield call(request, endpoint, requestOpt);
		const features = response.data.features;
		yield put(loadProjectSuccessAction(features))
	}catch(err){
		yield put(loadProjectErrorAction('Terjadi error saat mengambil data project!'))
	}	
}

export function* addProject(action){
	
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
		yield call(request, endpoint, requestOpt);
		yield put(addProjectSuccessAction());
	}catch(err){		
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
		if(response.data){
			yield put(hapusSungaiSuccessAction());
			yield put(getRiverAction())
		}		
	}catch(err){
	}	
}

// ambil atribut/properti sungai berdasarkan id sungai
// ini memanggil data berdasarkan id sungai
// khusus data yang sudah ada property di database

export function* fetchRiverAttribute(action){

	const idsung = action.payload;
	const endpoint = `${api.host}/api/geojson/sungai/attribut/${idsung}`;
	const requestOpt = { method:'GET' }
	
	try{
		const response = yield call(request, endpoint, requestOpt);
		const idkecm = response.data[0].idkecm;
		const nmsung = response.data[0].nmsung;
		const jenis_sungai = response.data[0].jenis_sungai.toString();
		const keterangan = response.data[0].keterangan ? response.data[0].keterangan : '';
		const idsungai = response.data[0].idsung;

		yield put(getRiverAttributeSuccessAction({ kecamatan:idkecm, sungai:nmsung, jenis_sungai:jenis_sungai, keterangan:keterangan, idsung:idsungai }));

	}catch(err){
		yield put(getRiverAttributeFailAction({
			kecamatan:'',
			sungai:'',
			jenis_sungai:'1',
			keterangan:'',
			idsung:''
		}))
	}
}

export function* fetchRiverAttributeById(action){

	const featureId = action.payload;
	const endpoint = `${api.host}/api/geojson/sungai/attributById/${featureId}`;
	const requestOpt = { method:'GET' }	
	try{
		const response = yield call(request, endpoint, requestOpt);
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

	const optionKey = action.payload;	
	const endpoint = `${api.host}/api/options/${optionKey}`;
	const requestOpt = { method:'GET' }

	try{
		const response = yield call(request,endpoint, requestOpt);
		if(response.status === 200){
			const data = response.data;
			const options = mapOptionsResponseToDisplay(optionKey,data);
			yield put(getOptionsSuccessAction(optionKey, options));		
		}		
	}	catch(err){
		
	}
}

export function* getMarkerOptions(action){
	const optionKey = action.payload;	
	const endpoint = `${api.host}/api/options/marker/list`;
	const requestOpt = { method:'GET' }
	try{
		const response = yield call(request,endpoint, requestOpt);
		if(response.status === 200){
			const data = response.data;
			const options = mapOptionsResponseToDisplay(optionKey,data);			
			yield put(getMarkerOptionsSuccessAction(optionKey, options));		
		}
	}catch(err){
		// yield errors
	}
}

export function* downloadExport(action){

	const fileNameToDownload = action.payload
	const endpoint = `${api.host}/api/geojson/download/${fileNameToDownload}`;
	const requestOpt = { method:'GET' }
	
	try{
		const response = yield call(request, endpoint, requestOpt);
		if(response.data){			
			yield put(downloadExportSuccessAction(response.data))
		}
	}catch(err){
		if(err){
			yield put(downloadExportErrorAction(err.message));
		}
	}
}


/**
 * MODEL TEST_PROJECT
 * FItur menggunakan Kolom Geometry
 * BARU 13/18/2019
 */

// add Geometry only no properties inserted
export function* addNewProject(action){

	const featureId = action.payload.featureId; 
	const features = action.payload.features;
	
	const endpoint = `${api.host}/api/geojson/project/addNew`;
	const requestOpt = {
		method:'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			featureId,
			features
		})
	}

	try{
		yield call(request, endpoint, requestOpt);
		yield put(addNewProjectSuccessAction())
	}catch(err){
		console.log(err);
	}
}

// update properties no Geometry
export function* addProjectProperties(action){
	
	const endpoint = `${api.host}/api/geojson/project/addProperties`;
	const requestOpt = {
		method:'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			features:action.payload.features,
			properties:action.payload.properties
		})
	}

	try{
		const response = yield call(request, endpoint, requestOpt);
		console.log(response)
		// if(response.data){
			yield put(addProjectPropertiesSuccessAction())
		// }
	}catch(err){
		yield put(addProjectPropertiesErrorAction())
	}
}

// get project attributes
export function* getProjectProperties(action){
	
	const featureId = action.payload;	
	const endpoint = `${api.host}/api/geojson/project/getAttribute/${featureId}`;
	const requestOpt = { method:'GET' }
	
	try{
		
		const response = yield call(request, endpoint, requestOpt);
		
		// make sure we have a data		
		if (response.data.length > 0) {			
			const data = response.data[0];

			const newObj = Object.entries(data).map(function(item){					
					return {
						key:item[0],
						value:item[1] === null ? "" : item[1]
					}
			});

			// console.log('newObj:',newObj);

			const uploadedFiles = yield getUploadFiles(featureId);
			const id = newObj[0].value;
			const nampro = newObj[2].value;
			const tglpro = newObj[3].value === "" ? "" : newObj[3].value.substring(0,10);
			const ketera = newObj[4].value;
			const marker = newObj[6].value;
			const progress = newObj[7].value;
			
			yield put(getProjectPropertiesSuccessAction({ 
				id, 
				nampro, 
				tglpro, 
				ketera, 
				upload: uploadedFiles,
				marker,
				progress 
			}));

		}else{
			yield put(getProjectPropertiesErrorAction({
				id:"",
				nampro:"",
				tglpro:new Date().toISOString().substring(0, 10),
				ketera:"",
		 		upload:[],
		 		marker:0,
		 		progress:0
			}))
		}
	}catch(err){
		const uploadedFiles = yield getUploadFiles(featureId);
		yield put(getProjectPropertiesErrorAction({
			id:"",
			nampro:"",
			tglpro:new Date().toISOString().substring(0, 10),
			ketera:"",
	 		upload:uploadedFiles,
	 		marker:0,
	 		progress:0
		}));
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
		takeLatest(DELETE_UPLOAD_ACTION, deleteUpload),
		// BARU 
		takeLatest(INSERT_PROJECT_FEATURES_ACTION, insertProjectFeatures),
		takeLatest(ADD_NEW_PROJECT_ACTION, addNewProject),
		takeLatest(ADD_PROJECT_PROPERTIES_ACTION, addProjectProperties),
		takeLatest(GET_PROJECT_PROPERTIES_ACTION, getProjectProperties),
		takeLatest(LOAD_PROJECT_ACTION, loadProject),
		takeLatest(GET_MARKER_OPTIONS_ACTION, getMarkerOptions)
	]);
}