import { fromJS } from 'immutable'
import { SET_AUTH_TOKEN_ACTION } from './constants'

const initialState = fromJS({
  auth: {
    // token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWR1c2VyIjoxLCJpYXQiOjE1NTg2NzQ5MzMsImV4cCI6MTU1ODY3NjEzM30.wx6CibyzrirGAjGdBzMW5AkAaSQ5Bhpbqb56PsCAfSY'
    token: null,
  },
  loading: false,
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN_ACTION:
      return state.setIn(['auth', 'token'], action.payload)
    default:
      return state
  }
}

export default appReducer
