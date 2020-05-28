import { fromJS } from 'immutable'

import {
  CHANGE_USERNAME_ACTION,
  CHANGE_PASSWORD_ACTION,
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  PUT_ROLE_ACTION,
} from './constants'

export const initialState = fromJS({
  credential: {
    username: '',
    password: '',
    role: '',
  },
  loading: false,
  error: {
    messageScope: null,
    message: null,
  },
})

function signInPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME_ACTION:
      return state.updateIn(['credential', 'username'], () => action.payload)
    case CHANGE_PASSWORD_ACTION:
      return state.updateIn(['credential', 'password'], () => action.payload)
    case LOGIN_ACTION:
      return state
        .set('loading', true)
        .setIn(['error', 'messageScope'], null)
        .setIn(['error', 'message'], null)
    case LOGIN_SUCCESS_ACTION:
      return state.set('loading', false)
    case LOGIN_ERROR_ACTION:
      return state
        .set('loading', false)
        .setIn(['error', 'messageScope'], action.payload.messageScope)
        .setIn(['error', 'message'], action.payload.message)
    case PUT_ROLE_ACTION:
      console.log('PUT_ROLE_ACTION:', action.payload)
      //return state.updateIn(['credential', 'role'], () => action.payload);
      // return state.setIn(['credential', 'role'], action.payload);
      return state
    default:
      return state
  }
}

export default signInPageReducer
