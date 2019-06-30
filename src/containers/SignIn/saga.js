import { put, takeLatest, select, call, all } from 'redux-saga/effects';
import request from '../../utils/request';
import { api } from '../../environtments';
import { LOGIN_ACTION, PUT_ROLE_ACTION } from './constants';
import { setAuthTokenAction } from '../../containers/App/actions';
import { loginSuccessAction, loginErrorAction, putRoleAction } from './actions';
import { makeSelectCredential } from './selectors';
import { makeSelectAuth } from '../App/selectors';
import jwt from 'jsonwebtoken';

export function* login(){
	const { 
		username,
		password } = yield select(makeSelectCredential());
	const endpoint = `${api.host}/api/auth/signin`
	const requestOpt = {
		method:'POST',
		 headers: {
      		'Content-Type': 'application/json',      
    	},
		body: JSON.stringify({
	      username,
	      password
	    })	    
	};

	try{
		const response = yield call(request, endpoint, requestOpt);
		const token = response.data.token;	
		yield put(setAuthTokenAction(token));		
		yield put(loginSuccessAction());
	}catch(err){
    	let errorMsg = null;
    	let msgScope = 'local';
    	if(err){
    		errorMsg = 'Login Error! Silahkan cek ulang data yang anda masukkan'; 
    		yield put(
		      loginErrorAction({
		        messageScope: msgScope,
		        message: errorMsg,
		      })
		    );    		
    	}
	}
}

export function* putRole(){
	const { token } = yield select(makeSelectAuth());
	const userData = jwt.decode(token);
	console.log('userData:',userData);
	try{
		yield put(putRoleAction(userData.user_category));
	}catch(err){
		console.log(err)
	}
}

export default function* signInPageSaga() {
	yield all([
  	takeLatest(LOGIN_ACTION, login),
  	takeLatest(PUT_ROLE_ACTION, putRole)
	])
}