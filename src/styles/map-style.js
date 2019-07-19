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
});


export const labelSungai = fromJS({
	id:'data_label_sungai',
	source:'dataLabelSungai',
	type:'symbol',
	interactive:false,
	layout:{
		'text-field':['get','nmsung'],
		'text-variable-anchor':['top','bottom','left','right'],
		'text-radial-offset':0.5,
		'text-justify':'auto'
	}
});

export const defaultMapStyle = fromJS(MAP_STYLE);