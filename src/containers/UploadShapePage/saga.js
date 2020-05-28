import { call, put, all, takeLatest } from 'redux-saga/effects'
import request from '../../utils/request'
import { api } from '../../environtments'

import { UPLOAD_SHAPE_ACTION } from './constant'
import { uploadShapeSuccessAction, uploadShapeErrorAction } from './action'

export function* uploadFile(shapeFile) {
  // console.log('SAGA:',shapeFile);
  const endpoint = `${api.host}/api/geojson/shape/upload`
  const formData = new FormData()
  formData.append('shape', shapeFile.file)
  const requestOption = {
    method: 'POST',
    body: formData,
  }

  try {
    const response = yield call(request, endpoint, requestOption)

    return response.data
  } catch (err) {
    throw err
  }
}

export function* uploadShapeFile(action) {
  const file = action.payload.files
  try {
    yield uploadFile(file)
    yield put(uploadShapeSuccessAction(true))
  } catch (err) {
    yield put(uploadShapeErrorAction('error upload shape file!'))
  }
}

export default function* UploadShapeSaga() {
  yield all([takeLatest(UPLOAD_SHAPE_ACTION, uploadShapeFile)])
}
