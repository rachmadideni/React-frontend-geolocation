import {
  CHANGE_USERNAME_ACTION,
  CHANGE_PASSWORD_ACTION,
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
} from './constants';

export function loginAction(){
	return {
		type:LOGIN_ACTION
	}
}

export function loginSuccessAction(){
	return {
		type:LOGIN_SUCCESS_ACTION
	}
}

export function loginErrorAction({ messageScope, message }){
	return {
		type:LOGIN_ERROR_ACTION,
		payload:{
			messageScope,
			message
		}
	}
}

export function changeUsernameAction(payload){
	return {
		type:CHANGE_USERNAME_ACTION,
		payload
	}
}

export function changePasswordAction(payload){
	return {
		type:CHANGE_PASSWORD_ACTION,
		payload
	}
}