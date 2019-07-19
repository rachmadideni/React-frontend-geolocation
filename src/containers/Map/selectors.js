import { createSelector } from 'reselect';
import { initialState } from './reducer';

const MapContainer = state => state.get('mapContainer', initialState);

const makeSelectTabValue = () => createSelector(MapContainer,substate=>substate.get('tabValue'))

const makeSelectMapConfig = () => createSelector(MapContainer,substate=>substate.get('config').toJS())

const makeSelectMapViewport = () => createSelector(MapContainer,substate=>substate.get('viewport').toJS()) 

const makeSelectGeojson = () => createSelector(MapContainer, substate => substate.get('geodata').toJS());

const makeSelectRiverData = () => createSelector(MapContainer, ss=>ss.getIn(['geodata','river']).toJS(),);
const makeSelectProjectData = () => createSelector(MapContainer, ss=>ss.getIn(['geodata','project']).toJS(),);

// select map style
const makeSelectMapStyle = () => createSelector(MapContainer, substate=>substate.get('mapStyle'))

// layer visibility
const makeSelectLayerVisibility = () => createSelector(MapContainer, substate=>substate.get('layerVisibility').toJS());

const makeSelectDrawerState = () => createSelector(MapContainer, substate=>substate.get('isDrawerOpen'))

const makeSelectDASMode = () => createSelector(MapContainer, substate=>substate.get('DASMODE'))

const makeSelectMarker = () => createSelector(MapContainer, substate => substate.get('marker').toJS())

const makeSelectOptions = () => createSelector(MapContainer, substate => substate.get('options').toJS())

const makeSelectRiverFeatures = () => createSelector(MapContainer, substate => substate.get('features').toJS())

const makeSelectLoading = () => createSelector(MapContainer, substate => substate.get('loading'))
const makeSelectErrorMessage = () => createSelector(MapContainer, substate => substate.getIn(['error','message']));
const makeSelectSnackBarState = () => createSelector(MapContainer, substate => substate.get('snackBarOpen'))

const makeSelectJenisSungai = () => createSelector(MapContainer, substate=>substate.get('jenis_sungai'))

const makeSelectFormRiverData = () => createSelector(MapContainer, state=>state.getIn(['form','river']).toJS())
const makeSelectFormProjectData = () => createSelector(MapContainer, state=>state.getIn(['form','project']).toJS())

const makeSelectDrawMode = () => createSelector(MapContainer, state=>state.get('mode'));

// select last inserted features without 
const selectFeatures = () => createSelector(MapContainer, state=>state.getIn(['geodata','river','features']).toJS()); 

// updatedGeometry
const makeSelectUpdatedFeatures = () => createSelector(MapContainer, state=>state.get('updatedFeatures'));

// const selectNewFeatureOnly = () => createSelector( selectFeatures, state => state.slice(-1) ) 
// console.log(selectFeatures);
export {
	makeSelectTabValue,
	makeSelectMapConfig,
	makeSelectMapViewport,
	makeSelectGeojson,
	makeSelectMarker,
	makeSelectMapStyle,
	makeSelectLayerVisibility,
	makeSelectDrawerState,
	makeSelectDASMode,
	makeSelectOptions,
	makeSelectRiverFeatures,
	makeSelectRiverData,
	makeSelectProjectData,
	makeSelectLoading,
	makeSelectErrorMessage,
	makeSelectSnackBarState,
	makeSelectJenisSungai,
	makeSelectFormRiverData,
	makeSelectFormProjectData,
	makeSelectDrawMode,
	selectFeatures,
	makeSelectUpdatedFeatures
}