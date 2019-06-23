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
	GET_PROJECT_ATTRIBUTE_ACTION,
	GET_PROJECT_ATTRIBUTE_SUCCESS_ACTION,
	GET_PROJECT_ATTRIBUTE_FAIL_ACTION,
	ADD_PROJECT_ACTION
} from './constants';

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
		type:GET_PROJECT_ATTRIBUTE_FAIL_ACTION,
		payload
	}
}

export function addProjectAction(payload){
	return {
		type:ADD_PROJECT_ACTION,
		payload
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
	console.log('getRiverAttributeSuccessAction payload:',payload);
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
	console.log('getRiverAction');
	return {
		type:GET_RIVER_ACTION
	}
}

export function getRiverSuccessAction(payload){
	console.log('getRiverSuccessAction payload:',payload);
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