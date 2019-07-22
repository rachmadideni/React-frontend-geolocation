import {
	// CHANGE_MAP_MODE_ACTION,	
	CHANGE_TABVALUE_ACTION,
	CHANGE_VIEWPORT_ACTION,
	// GET_GEOJSON_ACTION,
	// GET_GEOJSON_SUCCESS_ACTION,
	// PUT_MARKER_ACTION,
	// CLEAR_MARKER_ACTION,
	PUT_MARKER_SUCCESS_ACTION,
	CLEAR_MARKER_SUCCESS_ACTION,
	CHANGE_MAP_STYLE,
	CHANGE_LAYER_VISIBILITY,
	CHANGE_DRAWER_STATE,
	CHANGE_DAS_MODE,
	GET_OPTIONS_ACTION,
	GET_OPTIONS_SUCCESS_ACTION,
	ADD_RIVER_ACTION,
	SET_RIVER_PROP_ACTION,
	PUSH_RIVER_PROP_KEYVAL_ACTION,
	GET_RIVER_ATTRIBUTE_ACTION,
	GET_RIVER_ATTRIBUTE_SUCCESS_ACTION,
	GET_RIVER_ATTRIBUTE_FAIL_ACTION,
	GET_RIVER_ACTION,
	GET_RIVER_SUCCESS_ACTION,
	GET_RIVER_FAILED_ACTION,
	SET_SNACKBAR_ACTION,
	PILIH_JENIS_SUNGAI,
	UBAH_NAMA_SUNGAI_ACTION,
	UBAH_JENIS_SUNGAI_ACTION,
	UBAH_KECAMATAN_ACTION,
	UBAH_KETERANGAN_ACTION,
	HAPUS_SUNGAI_ACTION,
	HAPUS_SUNGAI_SUCCESS_ACTION,
	UBAH_NAMA_PROJECT_ACTION,
	UBAH_TANGGAL_PROJECT_ACTION,
	UBAH_KETERANGAN_PROJECT_ACTION,
	GET_PROJECT_ACTION,
	GET_PROJECT_SUCCESS_ACTION,
	GET_PROJECT_FAILED_ACTION,
	GET_PROJECT_ATTRIBUTE_ACTION,
	GET_PROJECT_ATTRIBUTE_SUCCESS_ACTION,
	GET_PROJECT_ATTRIBUTE_FAIL_ACTION,
	ADD_PROJECT_ACTION,
	ADD_PROJECT_SUCCESS_ACTION,
	UPLOAD_PROJECT_ACTION,
	UPLOAD_PROJECT_SUCCESS_ACTION,
	CHANGE_DRAW_MODE_ACTION,
	UPDATE_GEODATA_RIVER,
	INSERT_RIVER_FEATURES,
	INSERT_RIVER_FEATURES_SUCCESS,
	INSERT_RIVER_FEATURES_ERROR,
	CLEAR_RIVER_FORM,
	CLEAR_PROJECT_FORM,
	DOWNLOAD_EXPORT_ACTION,
	DOWNLOAD_EXPORT_SUCCESS_ACTION,
	DOWNLOAD_EXPORT_ERROR_ACTION,
	ADD_NEW_RIVER_ACTION,
	ADD_NEW_RIVER_SUCCESS_ACTION,
	ADD_NEW_RIVER_ERROR_ACTION,
	UPDATE_RIVER_PROPERTY_ACTION,
	UPDATE_RIVER_PROPERTY_SUCCESS_ACTION,
	UPDATE_RIVER_PROPERTY_ERROR_ACTION,
	GET_RIVER_ATTRIBUTE_BYID_ACTION,
	GET_RIVER_ATTRIBUTE_BYID_SUCCESS_ACTION,
	GET_RIVER_ATTRIBUTE_BYID_FAIL_ACTION,
	QUERY_PROPERTI_ACTION,
	QUERY_PROPERTI_SUCCESS_ACTION,
	QUERY_PROPERTI_ERROR_ACTION,
	UPDATE_FEATURES_ACTION,
	REPLACE_MAP_ACTION,
	REPLACE_MAP_SUCCESS_ACTION,
	REPLACE_MAP_ERROR_ACTION,
	HAPUS_PROJECT_ACTION,
	HAPUS_PROJECT_SUCCESS_ACTION,
	HAPUS_PROJECT_ERROR_ACTION,
	REPLACE_COORD_ACTION,
	REPLACE_COORD_SUCCESS_ACTION,
	REPLACE_COORD_ERROR_ACTION
} from './constants';


export function replaceCoordinatesProjectAction(payload){
	return {
		type:REPLACE_COORD_ACTION,
		payload
	}
}

export function replaceCoordinatesProjectSuccessAction(payload){
	return {
		type:REPLACE_COORD_SUCCESS_ACTION,
		payload
	}
}

export function replaceCoordinatesProjectErrorAction(payload){
	return {
		type:REPLACE_COORD_ERROR_ACTION,
		payload
	}
}

export function replaceMapAction(payload){
	return {
		type:REPLACE_MAP_ACTION,
		payload
	}
}

export function replaceMapSuccessAction(payload){
	return {
		type:REPLACE_MAP_SUCCESS_ACTION,
		payload
	}
}

export function replaceMapErrorAction(payload){
	return {
		type:REPLACE_MAP_ERROR_ACTION,
		payload
	}
}

export function updateFeaturesAction(payload){
	return {
		type:UPDATE_FEATURES_ACTION,
		payload
	}
}

// BACKUP PROPERTI SUNGAI (18/07/2019)
export function queryPropertiAction(payload){
	return {
		type:QUERY_PROPERTI_ACTION,
		payload
	}
}

export function queryPropertiSuccessAction(payload){
	return {
		type:QUERY_PROPERTI_SUCCESS_ACTION,
		payload
	}
}

export function queryPropertiErrorAction(payload){
	return {
		type:QUERY_PROPERTI_ERROR_ACTION,
		payload
	}
}

// UPDATE PROPERTY SNGAI BARU (15/07/2019)
export function updateRiverPropertyAction(payload){
	return {
		type:UPDATE_RIVER_PROPERTY_ACTION,
		payload
	}	
}

export function updateRiverPropertySuccessAction(payload){
	return {
		type:UPDATE_RIVER_PROPERTY_SUCCESS_ACTION,
		payload
	}
}

export function updateRiverPropertyErrorAction(payload){
	return {
		type:UPDATE_RIVER_PROPERTY_ERROR_ACTION,
		payload
	}
}
	

// TAMBAH SUNGAI BARU (15/07/2019)
export function AddNewRiverAction(payload){
	return {
		type:ADD_NEW_RIVER_ACTION,
		payload
	}
}

export function AddNewRiverSuccessAction(){
	return {
		type:ADD_NEW_RIVER_SUCCESS_ACTION		
	}
}

export function AddNewRiverErrorAction(){
	return {
		type:ADD_NEW_RIVER_ERROR_ACTION		
	}
}


// UBAH FORM PROJECT DATA
export function ubahNamaProjectAction(value){
	return {
		type:UBAH_NAMA_PROJECT_ACTION,
		value
	}
}

export function ubahTanggalProjectAction(value){
	return {
		type:UBAH_TANGGAL_PROJECT_ACTION,
		value
	}
}

export function ubahKeteranganProjectAction(value){
	return {
		type:UBAH_KETERANGAN_PROJECT_ACTION,
		value
	}
}

export function getProjectAttributeAction(payload){
	return {
		type:GET_PROJECT_ATTRIBUTE_ACTION,
		payload
	}
}

export function getProjectAttributeSuccessAction(payload){
	return {
		type:GET_PROJECT_ATTRIBUTE_SUCCESS_ACTION,
		payload
	}
}

export function getProjectAttributeFailAction(payload){
	return {
		type: GET_PROJECT_ATTRIBUTE_FAIL_ACTION,
		payload
	}
}

export function addProjectAction(payload){
	return {
		type:ADD_PROJECT_ACTION,
		payload
	}
}

export function addProjectSuccessAction(){
	return {
		type:ADD_PROJECT_SUCCESS_ACTION
	}
}

export function uploadProjectAction(file){
	return {
		type:UPLOAD_PROJECT_ACTION,
		payload:file		
	}
}

export function uploadProjectSuccessAction(){
	return {
		type: UPLOAD_PROJECT_SUCCESS_ACTION
	}
}
	

// UBAH FORM RIVER DATA
export function ubahNamaSungaiAction(value){
	return {
		type:UBAH_NAMA_SUNGAI_ACTION,
		value
	}
}

export function ubahJenisSungaiAction(value){
	return {
		type:UBAH_JENIS_SUNGAI_ACTION,
		value
	}
}

export function ubahKecamatanAction(value){
	return {
		type:UBAH_KECAMATAN_ACTION,
		value
	}
}

export function ubahKeteranganAction(value){
	return {
		type:UBAH_KETERANGAN_ACTION,
		value
	}
}

export function getRiverAttributeAction(payload){
	// console.log(payload);
	return {
		type:GET_RIVER_ATTRIBUTE_ACTION,
		payload
	}
}

export function getRiverAttributeSuccessAction(payload){
	//console.log('getRiverAttributeSuccessAction payload:',payload);
	return {
		type:GET_RIVER_ATTRIBUTE_SUCCESS_ACTION,
		payload
	}	
}

export function getRiverAttributeFailAction(payload){
	return {
		type:GET_RIVER_ATTRIBUTE_FAIL_ACTION,
		payload
	}
}

// ambil attribut sungai baru (15/07/2019)
export function getRiverAttributeByIdAction(payload){
	return {
		type:GET_RIVER_ATTRIBUTE_BYID_ACTION,
		payload
	}
}

export function getRiverAttributeByIdSuccessAction(payload){
	return {
		type:GET_RIVER_ATTRIBUTE_BYID_SUCCESS_ACTION,
		payload
	}	
}

export function getRiverAttributeByIdFailAction(payload){
	return {
		type:GET_RIVER_ATTRIBUTE_BYID_FAIL_ACTION,
		payload
	}
}

export function hapusSungaiAction(payload){
	return {
		type:HAPUS_SUNGAI_ACTION,
		payload
	}
}

export function hapusSungaiSuccessAction(){
	return {
		type:HAPUS_SUNGAI_SUCCESS_ACTION
	}
}

export function hapusProjectAction(payload){
	return {
		type:HAPUS_PROJECT_ACTION,
		payload
	}
}

export function hapusProjectSuccessAction(){
	return {
		type:HAPUS_PROJECT_SUCCESS_ACTION
	}
}

export function hapusProjectErrorAction(){
	return {
		type:HAPUS_PROJECT_ERROR_ACTION
	}
}

export function pushRiverPropKeyValAction(payload){
	return {
		type:PUSH_RIVER_PROP_KEYVAL_ACTION,
		payload
	}
}
export function setRiverPropAction(features){
	return {
		type: SET_RIVER_PROP_ACTION,
		payload: features
	}
}

export function addRiverAction(payload){
	return {
		type:ADD_RIVER_ACTION,
		payload
	}
}

export function getOptionsAction(key){
	return {
		type:GET_OPTIONS_ACTION,
		payload:key
	}
}

export function getOptionsSuccessAction(key,options){
	return {
		type:GET_OPTIONS_SUCCESS_ACTION,
		payload:{
			key,
			options
		}
	}
}

export function changeDasModeAction(payload){
	return {
		type:CHANGE_DAS_MODE,
		payload
	}
}

export function changeDrawerStateAction(payload){
	return {
		type:CHANGE_DRAWER_STATE,
		payload
	}
}

/*export function changeMapModeAction(){
	return {
		type:CHANGE_MAP_MODE_ACTION
	}
} */

export function changeTabValueAction(payload){
	return {
		type:CHANGE_TABVALUE_ACTION,
		payload
	}
}

export function changeViewportAction({ latitude,longitude,zoom }){
	return {
		type:CHANGE_VIEWPORT_ACTION,
		payload:{
			latitude,
			longitude,
			zoom
		}
	}
}

/*export function getGeojonAction(key){
	return {
		type:GET_GEOJSON_ACTION,
		payload:key
	}
}

export function getGeojsonSuccessAction(key,geojson){
	return {
		type:GET_GEOJSON_SUCCESS_ACTION,
		payload:{
			key,
			geojson
		}
	}
}*/

export function putMarkerSuccessAction(marker){
	return {
		type:PUT_MARKER_SUCCESS_ACTION,
		payload:marker
	}
}

export function clearMarkerSuccessAction(){
	return {
		type:CLEAR_MARKER_SUCCESS_ACTION
	}
}

export function changeMapStyleAction(payload){
	return {
		type:CHANGE_MAP_STYLE,
		payload
	}	
}

export function changeLayerVisibilityAction({ kecamatan,sungai,project }){
	return {
		type:CHANGE_LAYER_VISIBILITY,
		payload:{
			kecamatan,
			sungai,
			project
		}
	}
}

export function getRiverAction(){
	// console.log('getRiverAction');
	return {
		type:GET_RIVER_ACTION
	}
}

export function getRiverSuccessAction(payload){
	// console.log('getRiverSuccessAction payload:',payload);
	return {
		type:GET_RIVER_SUCCESS_ACTION,
		payload
	}
}

export function getRiverFailedAction(payload){
	return {
		type:GET_RIVER_FAILED_ACTION,
		payload
	}
}

export function setSnackbarAction(payload){
	return {
		type:SET_SNACKBAR_ACTION,
		payload
	}	
}

// pilih jenis sungai (1=sungai utama,2=anak sungai)
export function pilihJenisSungaiAction(payload){
	return {
		type:PILIH_JENIS_SUNGAI,
		payload
	}
}

export function getProjectAction(){
	return {
		type:GET_PROJECT_ACTION
	}
}

export function getProjectSuccessAction(payload){
	// console.log('getProjectSuccessAction payload:',payload);
	return {
		type:GET_PROJECT_SUCCESS_ACTION,
		payload
	}
}

export function getProjectFailedAction(payload){
	return {
		type:GET_PROJECT_FAILED_ACTION,
		payload
	}
}

export function changeDrawModeAction(payload){
	return {
		type:CHANGE_DRAW_MODE_ACTION,
		payload
	}	
}

export function updateGeodataRiver(payload){
	return {
		type:UPDATE_GEODATA_RIVER,
		payload
	}	
}

export function insertRiverFeaturesAction(payload){
	return {
		type:INSERT_RIVER_FEATURES,
		payload
	}	
}

export function insertRiverFeaturesSuccessAction(){
	return {
		type:INSERT_RIVER_FEATURES_SUCCESS,		
	}	
}

export function insertRiverFeaturesErrorAction(payload){
	return {
		type:INSERT_RIVER_FEATURES_ERROR,
		payload
	}	
}

export function clearRiverFormAction(){
	return {
		type:CLEAR_RIVER_FORM
	}
}

export function clearProjectFormAction(){
	return {
		type:CLEAR_PROJECT_FORM
	}
}


export function downloadExportAction(payload){
	return {
		type:DOWNLOAD_EXPORT_ACTION,
		payload
	}
}

export function downloadExportSuccessAction(payload){
	return {
		type:DOWNLOAD_EXPORT_SUCCESS_ACTION,
		payload
	}
}

export function downloadExportErrorAction(payload){
	return {
		type:DOWNLOAD_EXPORT_ERROR_ACTION,
		payload
	}
}
