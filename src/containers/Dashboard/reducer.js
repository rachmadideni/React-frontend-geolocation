import { fromJS } from 'immutable'

import {
  CHANGE_MAIN_DRAWER_TAB_VALUE,
  CHANGE_DAS_INNER_TAB_VALUE,
  NEW_RIVER_ACTION,
} from './constants'

export const initialState = fromJS({
  mainDrawerTabValue: 0,
  DasInnerTabValue: 0,
  DasActionValue: '',
})

function drawerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MAIN_DRAWER_TAB_VALUE:
      return state.set('mainDrawerTabValue', action.payload)
    case CHANGE_DAS_INNER_TAB_VALUE:
      return state.set('DasInnerTabValue', action.payload)
    case NEW_RIVER_ACTION:
      return state.set('DasActionValue', action.payload)
    default:
      return state
  }
}

export default drawerReducer
