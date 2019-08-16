import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';
import TaludIcon from '../../../icons/talud';
import MarkerIcon from '../../../icons/marker';

const BaseTabs = styled(Tabs).attrs({
	classes:{
		indicator:'indicator'
	}
})`
	&& {
		.indicator {
			display:none;
		}
	}
`;

const IconTab = styled(Tab).attrs({
	classes:{
		selected:'selected',
		//labelContainer:'label-container'
	}
})`
	&& {
		min-width:80px;
		min-height:72px;
		opacity:0.5;
		transition: background-color 200ms ease-in-out;
		
	}
	&.label-container{
	 	margin-top:6px;
	 	font-size:10px;
	 	padding:0;
	 	line-height: 1;
	}
	&.selected{
		background-color:#6bd675;
		color:white;
		opacity:1
	}
`

function HorizontalTabs(props){
	const { tabs,...tabsProps} = props;
	return (
		<BaseTabs {...tabsProps}>
		{
			tabs.map((tab,index)=>{
				const key = `markerTab-${index}`;
				//const Icon = tab.icon;//<tab.icon />				
				return <IconTab key={key} icon={<tab.icon />} label={tab.label} />;
			})
		}
		</BaseTabs>
	);
}

class MarkerSelector extends Component {	

	// DATA PILIHAN ICON (STATIC)
	getItemIcon(){
		return [{
			icon:MarkerIcon,
			label:'default'
		},{
			icon:TaludIcon,
			label:'talud'
		}]
	}	

	handleMarker = () => {
		this.props.handleMarker(!this.props.markerOpen)
	}

	handleMarkerChange = (event,value) => {
		this.props.handleMarkerChange(value);
	}

	render(){		
		const { markerValue } = this.props
		return (
			<Dialog 
				open = { this.props.markerOpen }
				onClose = { this.handleMarker } >				
				
				<Typography 
					gutterBottom
					style={{
						paddingTop:8,
						paddingLeft:15,
						paddingBottom:0
					}}>
					Pilih Marker				
				</Typography>
				
				<DialogActions>
					<HorizontalTabs 
						value = { markerValue }
						onChange = { this.handleMarkerChange }
						tabs = { this.getItemIcon() } />
				</DialogActions>

			</Dialog>
		);
	}
}

MarkerSelector.propTypes = {
	markerOpen:PropTypes.bool.isRequired,
	handleMarker: PropTypes.func.isRequired,
	handleMarkerChange: PropTypes.func.isRequired,
	markerValue: PropTypes.number	
}

export default MarkerSelector;
