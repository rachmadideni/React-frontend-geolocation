import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSigninPageDomain = state => state.get('signInPage', initialState);

const makeSelectCredential = () => createSelector(selectSigninPageDomain,substate=>substate.get('credential').toJS())

const makeSelectLoading = () => createSelector(selectSigninPageDomain,substate=>substate.get('loading'))

const makeSelectError = () => createSelector(selectSigninPageDomain,substate=>substate.get('error').toJS())

export {
	makeSelectLoading,
	makeSelectError,
	makeSelectCredential
}