import { createSelector } from 'reselect'
import { initialState } from './reducer'

const drawerDomain = (state) => state.get('drawer', initialState)

const mainDrawerTabValue = () =>
  createSelector(drawerDomain, (substate) => substate.get('mainDrawerTabValue'))
const DasInnerTabValue = () =>
  createSelector(drawerDomain, (substate) => substate.get('DasInnerTabValue'))
const DasInnerActionValue = () =>
  createSelector(drawerDomain, (substate) => substate.get('DasActionValue'))

export { mainDrawerTabValue, DasInnerTabValue, DasInnerActionValue }
