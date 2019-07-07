import {fromJS} from 'immutable';
import MAP_STYLE from '../data/style.json';

export const dataLayer = fromJS({
	id:'data_sungai',
	source:'incomeByState',
	type:'line',
	interactive:true,
	paint:{
		'line-color':'hsl(206, 88%, 43%)',
		'line-width':3
	}
}) 

export const defaultMapStyle = fromJS(MAP_STYLE);