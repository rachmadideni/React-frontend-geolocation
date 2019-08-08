import {
	UPLOAD_SHAPE_ACTION,
	UPLOAD_SHAPE_SUCCESS_ACTION,
	UPLOAD_SHAPE_ERROR_ACTION
} from './constant';


export function uploadShapeAction(file){
	return {
		type:UPLOAD_SHAPE_ACTION,
		payload:file
	}
}

export function uploadShapeSuccessAction(payload){
	return {
		type:UPLOAD_SHAPE_SUCCESS_ACTION,
		payload
	}
}

export function uploadShapeErrorAction(payload){
	return {
		type:UPLOAD_SHAPE_ERROR_ACTION,
		payload
	}
}
