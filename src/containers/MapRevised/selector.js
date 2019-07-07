import { createSelector } from 'reselect';
import { initialState } from './reducer';

const container = state => state.get('finalMap', initialState);
const data_proyek = () => createSelector(container, substate=>substate.getIn(['data','proyek']).toJS())
const data_sungai = () => createSelector(container, substate=>substate.getIn(['data','sungai']).toJS())
const data_upload = () => createSelector(container, substate=>substate.getIn(['data','gambar_proyek']).toJS())
const attribut_proyek = () => createSelector(container, state=>state.getIn(['data','attribute','proyek']).toJS())
const viewport = () => createSelector(container, state=>state.getIn(['map','viewport']).toJS())

export {
	data_proyek,
	data_sungai,
	data_upload,
	attribut_proyek,
	viewport
}