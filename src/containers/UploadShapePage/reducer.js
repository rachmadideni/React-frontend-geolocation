import { fromJS } from 'immutable'
import {
  UPLOAD_SHAPE_ACTION,
  UPLOAD_SHAPE_SUCCESS_ACTION,
  UPLOAD_SHAPE_ERROR_ACTION,
} from './constant'

export const initialState = fromJS({
  isLoading: false,
  isShapeFileUploaded: false,
  errorMessage: null,
})

function uploadShapeReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_SHAPE_ACTION:
      return state.set('isLoading', true)
    case UPLOAD_SHAPE_SUCCESS_ACTION:
      return state
        .set('isLoading', false)
        .set('isShapeFileUploaded', action.payload)
    case UPLOAD_SHAPE_ERROR_ACTION:
      return state.set('isLoading', false).set('errorMessage', action.payload)
    default:
      return state
  }
}

export default uploadShapeReducer
