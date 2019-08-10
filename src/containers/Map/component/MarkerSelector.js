import React, { Fragment, Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';

// test icon
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import RiverIcon from '@material-ui/icons/Fingerprint';
import TaludIcon from '../../../icons/talud';
import MarkerIcon from '../../../icons/marker';
// import WorldIcon from '../../../icons/world';

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
		labelContainer:'label-container'
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
				return <IconTab key={key} icon={<tab.icon />} label={tab.label} />;
			})
		}
		</BaseTabs>
	);
}

class MarkerSelector extends Component {
	constructor(props){
		super(props);
		this.state = {
			tabValue:0
		}
	}
	getItemIcon(){
		return [{
			icon:TaludIcon,
			label:'talud'
		},
		{
			icon:MarkerIcon,
			label:'marker'
		}]
	}

	handleMarker = () => {
		this.props.handleMarker(!this.props.markerOpen)
	}

	handleTabChange = (event,value) => {
		this.setState({
			tabValue:value
		})
	}

	render(){
		const { tabValue } = this.state;
		return (
			<Dialog 
				open={this.props.markerOpen}
				onClose={this.handleMarker}>
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
						value={tabValue}
						onChange = { this.handleTabChange }
						tabs={this.getItemIcon()} />
				</DialogActions>
			</Dialog>
		);
	}
}

export default MarkerSelector;
