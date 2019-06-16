import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectAuth = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('auth').toJS(),
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('error'),
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.get('location').toJS(),
  );

export {
  selectGlobal,
  makeSelectAuth,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
};
