import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { color } from '../../styles/constants';

const Wrapper = styled(Grid)`
	&& {
		width:30vw;		
		position:absolute;
		top:10px;
		left:10px;
		// padding-top:15px;
		// padding-bottom:15px;
		// padding-left:15px;
		// padding-right:15px;
		padding:8px;
		overflow:hidden;		
	}
`
const FormWrapper = styled(Grid)`
	&& {
		width:100%;		
		border-radius:0;
		box-shadow:none;
		padding:20px;
		// max-height:100vh;
		overflow:hidden;
	}
`
const FormInnerWrapper = styled(Grid)`
	//display:flex;
	width:100%;
	border-radius:0;
	box-shadow:none;
`

const ActionButton = styled(Button).attrs({
	classes:{ root:'root',disabled:'.disabled',label:'label' }
})`	
	.label {
		text-transform:capitalize;
	}
	&&{
		color:white;
		background-color:${props=>props.success ? color.success : color.secondary};
		box-shadow:none;
		margin-bottom:5px;
		margin-right:5px;
		'&::hover': {
			background-color:'orange'
		}
	}
`

const HeaderStyled = styled(Grid)`
	width:60%;
	border-radius:0;
	box-shadow:none;
`

function FormHeader(props){
	return (		
			<Typography 
				align="left" 
				color="secondary" 
				variant="subtitle2"
				gutterBottom>
					{props.judul}
			</Typography>		
	)
}


export { Wrapper, FormWrapper, ActionButton, FormHeader, FormInnerWrapper }