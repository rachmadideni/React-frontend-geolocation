import { put, takeLatest, select, call } from 'redux-saga/effects';
import request from '../../utils/request';
import { api } from '../../environtments';
import { LOGIN_ACTION } from './constants';
import { setAuthTokenAction } from '../../containers/App/actions';
import { loginSuccessAction, loginErrorAction } from './actions';
import { makeSelectCredential } from './selectors';

export function* login(){
	const { username,password } = yield select(makeSelectCredential());
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
		// console.log('saga response',response.response.token);
    	yield put(setAuthTokenAction(response.response.token));
    	yield put(loginSuccessAction());
	}catch(err){
		// console.log('saga error:',err.response);
		// let response = null;
    	let errorMsg = null;
    	let msgScope = 'local';
    	if(err){
    		errorMsg = 'Data User login salah! Silahkan cek ulang data yang anda masukkan'; 
    		yield put(
		      loginErrorAction({
		        messageScope: msgScope,
		        message: errorMsg,
		      }),
		    );    		
    	}
	}
}

export default function* signInPageSaga() {
  yield takeLatest(LOGIN_ACTION, login);
}