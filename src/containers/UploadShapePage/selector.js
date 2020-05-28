import { createSelector } from 'reselect'
import { initialState } from './reducer'

const UploadShapeContainer = (state) => state.get('uploadShape', initialState)
const makeSelectLoading = () =>
  createSelector(UploadShapeContainer, (substate) => substate.get('isLoading'))
const makeSelectErrorMessage = () =>
  createSelector(UploadShapeContainer, (substate) =>
    substate.get('errorMessage')
  )
const makeSelectIsShapeFileUploaded = () =>
  createSelector(UploadShapeContainer, (substate) =>
    substate.get('isShapeFileUploaded')
  )
export {
  makeSelectLoading,
  makeSelectErrorMessage,
  makeSelectIsShapeFileUploaded,
}
