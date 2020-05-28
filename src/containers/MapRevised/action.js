import {
  GET_PROJECT_ACTION,
  GET_PROJECT_SUCCESS_ACTION,
  GET_PROJECT_FAIL_ACTION,
  GET_RIVER_ACTION,
  GET_RIVER_SUCCESS_ACTION,
  GET_RIVER_FAIL_ACTION,
  GET_PROJECT_FILES_ACTION,
  GET_PROJECT_FILES_SUCCESS_ACTION,
  GET_PROJECT_FILES_FAIL_ACTION,
  GET_PROJECT_ATTRIBUTE_ACTION,
  GET_PROJECT_ATTRIBUTE_SUCCESS_ACTION,
  GET_PROJECT_ATTRIBUTE_FAIL_ACTION,
  CHANGE_VIEWPORT_ACTION,
} from './constant'

// atribut proyek (data & upload)
export function getProjectAttributeAction(payload) {
  return {
    type: GET_PROJECT_ATTRIBUTE_ACTION,
    payload,
  }
}

export function getProjectAttributeSuccessAction(payload) {
  return {
    type: GET_PROJECT_ATTRIBUTE_SUCCESS_ACTION,
    payload,
  }
}

export function getProjectAttributeFailAction(payload) {
  return {
    type: GET_PROJECT_ATTRIBUTE_FAIL_ACTION,
    payload,
  }
}

// ambil upload files Proyek
export function getProjectFilesAction(featureId) {
  return {
    type: GET_PROJECT_FILES_ACTION,
    featureId,
  }
}

export function getProjectFilesSuccessAction(payload) {
  return {
    type: GET_PROJECT_FILES_SUCCESS_ACTION,
    payload,
  }
}

export function getProjectFilesFailAction(payload) {
  return {
    type: GET_PROJECT_FILES_FAIL_ACTION,
    payload,
  }
}

/***
	ambil data Proyek
*/

export function getProjectAction() {
  return {
    type: GET_PROJECT_ACTION,
  }
}

export function getProjectSuccessAction(payload) {
  return {
    type: GET_PROJECT_SUCCESS_ACTION,
    payload,
  }
}

export function getProjectFailAction(payload) {
  return {
    type: GET_PROJECT_FAIL_ACTION,
    payload,
  }
}

export function getRiverAction() {
  return {
    type: GET_RIVER_ACTION,
  }
}

export function getRiverSuccessAction(payload) {
  return {
    type: GET_RIVER_SUCCESS_ACTION,
    payload,
  }
}

export function getRiverFailAction(payload) {
  return {
    type: GET_RIVER_FAIL_ACTION,
    payload,
  }
}

export function changeViewportAction(payload) {
  return {
    type: CHANGE_VIEWPORT_ACTION,
    payload,
  }
}
