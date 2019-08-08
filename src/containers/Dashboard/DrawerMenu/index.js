import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import { Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import RiverIcon from '@material-ui/icons/Fingerprint';
import WorldIcon from '../../../icons/world';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// TAB 1 & 2
import Pengaturan from '../Pengaturan'
// import DasTab from '../Das'

// redux
import { createStructuredSelector } from 'reselect';

import {
	changeMainDrawerTabValueAction
} from '../action';

import reducer from '../reducer';
import injectReducer from '../../../utils/injectReducer';
import {
	mainDrawerTabValue,	
} from '../selectors';

import { makeSelectDrawerState } from '../../Map/selectors';

import { changeDrawerStateAction } from '../../Map/action';

const BaseTabs = styled(Tabs).attrs({
	classes:{
		flexContainer:'flex-container',
		indicator:'indicator'
	}
})`
	&& {
		.flex-container{
			flex-direction:column;			
		}
		.indicator{
			display:none;
		}
	}
`

const IconTab = styled(Tab).attrs({
	classes:{
		selected:'selected',
		// labelContainer:'label-container'
	}
})`
	&& {
		min-width:80px;
		min-height:72px;
		opacity:0.5;
		transition: background-color 200ms ease-in-out;
		
		// .label-container{
		// 	margin-top:6px;
		// 	font-size:10px;
		// 	padding:0;
		// 	line-height: 1;
		// }
	}
	&.selected{
		background-color:#354577;
		color:white;
		opacity:1
	}
`
const TabContainer = styled(Grid)`
	width:600px;
	height:100%;
	backgroundColor:none;
	overflowX:hidden;
	overflowY:hidden;
`

function VerticalTabs(props){
	const { tabs, ...tabsProps } = props;
	return (
		<BaseTabs {...tabsProps}>
		{tabs.map((tab,index)=>{
			const key = `navTab-${tab.label}-${index}`;
			return <IconTab key={key} icon={<tab.icon />} label={tab.label} />;
		})}
		</BaseTabs>
	);
}

class Drawer extends React.Component{

	getLeftTabsIcon(){
		return [
			{
				icon:DashboardIcon,
				label:'Dashboard'
			},
			{
				icon:SettingsIcon,
				label:'Pengaturan'
			},
			{
				icon:RiverIcon,
				label:'DAS SHAPE'
			},{
				icon:RiverIcon,
				label:'DAS ATRIBUT'
			},{
				icon:WorldIcon,
				label:'PROJECT'
			},{
				icon:WorldIcon,
				label:'Download'
			},{
				icon:CloudUploadIcon,
				label:'Upload Shape'
			}
		]
	}

	handleTabChange = (event,value) => {
		
		const {
			changeMainDrawerTabValue,
			history
		} = this.props;

		changeMainDrawerTabValue(value);

		if (value === 0) {
			this.toggleDrawer();
			return history.replace('/dashboard');
		}

		if(value===1){						
			return history.replace('/dashboard');
		}

		if(value===2){			
			this.toggleDrawer();
			return history.replace('/draw/riverShape');
		}

		if(value===3){			
			this.toggleDrawer();
			return history.replace('/draw/riverAtribut');
		}

		if(value===4){
			this.toggleDrawer();
			return history.replace('/draw/project');
		}

		if(value===5){
			this.toggleDrawer();
			return history.replace('/download');
		}

		if(value===6){
			this.toggleDrawer();
			return history.replace('/upload/shape');	
		}

		return null;
	}

	handleDASMode = (event,value) =>{		
		this.props.changeDasMode(value);
	}

	toggleDrawer = () =>{
		this.props.toggleDrawer();
	}

	render(){
		
		const { 
			mainDrawerTabValue,
			//history 
		} = this.props

		return (
			<Grid 
				container 
				wrap="nowrap" 				
				style={{ 										
					// width:'40vw',
					height:'100%',
				}}>

				<Grid 
	    		container 
	    		direction="column" 
	    		style={{ 
	    			//width:'94%',
	    			height:'100%',
	    			overflowX:'hidden',
						overflowY:'hidden'
	    		}}>
		      	<Grid item 		      		
		      		style={{ 
		      			backgroundColor:'#ededed',
		      			height:'100%' 
		      		}}>

								<VerticalTabs 
									value={mainDrawerTabValue}
									onChange = { this.handleTabChange }
									tabs={this.getLeftTabsIcon()} />

						</Grid>
						{
							mainDrawerTabValue === 1 && 
							<TabContainer item>
								<Pengaturan /> 
							</TabContainer>
						}
						{/*
							mainDrawerTabValue === 2 &&
							<TabContainer item {...this.props}>
								<DasTab history={this.props} />																
							</TabContainer>							 
						*/}
						
				</Grid>
			</Grid>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	mainDrawerTabValue: mainDrawerTabValue(),
	drawerState: makeSelectDrawerState()
});

function mapDispatchToProps(dispatch){
	return {
		changeMainDrawerTabValue: value => dispatch(changeMainDrawerTabValueAction(value)),
		changeDrawerState: value => dispatch(changeDrawerStateAction(value)),
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: 'drawer', reducer });

export default compose(
	withReducer,	
	withConnect
)(Drawer);
