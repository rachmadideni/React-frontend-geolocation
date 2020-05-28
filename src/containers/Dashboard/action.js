import {
  CHANGE_MAIN_DRAWER_TAB_VALUE,
  CHANGE_DAS_INNER_TAB_VALUE,
  NEW_RIVER_ACTION,
  NEW_RIVER_SUCCESS_ACTION,
} from './constants'

export function changeMainDrawerTabValueAction(payload) {
  return {
    type: CHANGE_MAIN_DRAWER_TAB_VALUE,
    payload,
  }
}

export function changeDasInnerTabValueAction(payload) {
  return {
    type: CHANGE_DAS_INNER_TAB_VALUE,
    payload,
  }
}

// DAS ACTION
export function newRiverAction(payload) {
  return {
    type: NEW_RIVER_ACTION,
    payload,
  }
}

export function newRiverSuccessAction(payload) {
  return {
    type: NEW_RIVER_SUCCESS_ACTION,
    payload,
  }
}
