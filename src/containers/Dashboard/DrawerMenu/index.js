import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import RiverIcon from '@material-ui/icons/Fingerprint';
import WorldIcon from '../../../icons/world';

// TAB 1 & 2
import Pengaturan from '../Pengaturan'
import DasTab from '../Das'

// redux
import { createStructuredSelector } from 'reselect';

import {
	changeMainDrawerTabValueAction
} from '../action';

import reducer from '../reducer';
import injectReducer from '../../../utils/injectReducer';
import {
	mainDrawerTabValue
} from '../selectors';

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
		labelContainer:'label-container'
	}
})`
	&& {
		min-width:80px;
		min-height:72px;
		opacity:0.5;
		transition: background-color 200ms ease-in-out;
		
		.label-container{
			margin-top:6px;
			font-size:10px;
			padding:0;
			line-height: 1;
		}
	}
	&.selected{
		background-color:#354577;
		color:white;
		opacity:1
	}
`
const TabContainer = styled(Grid)`
	width:94%;
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
				icon:SettingsIcon,
				label:'Pengaturan'
			},
			{
				icon:RiverIcon,
				label:'DAS'
			},{
				icon:WorldIcon,
				label:'PROJECT'
			}
		]
	}

	handleTabChange = (event,value) => {
		const { changeMainDrawerTabValue } = this.props;		
		return changeMainDrawerTabValue(value);		
	}

	handleDASMode = (event,value) =>{		
		this.props.changeDasMode(value);
	}

	render(){
		const {
			mainDrawerTabValue
		} = this.props
		return (
			<Grid 
				container 
				wrap="nowrap" 				
				style={{ 										
					width:'40vw',
					height:'100%',
					// backgroundColor:'pink'					
				}}>				
				<Grid 
	    		container 
	    		direction="column" 
	    		style={{ 
	    			width:'94%',
	    			height:'100%',
	    			overflowX:'hidden',
						overflowY:'hidden'
	    			//backgroundColor:'tomato' 
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
							mainDrawerTabValue === 0 && 
							<TabContainer item>
								<Pengaturan /> 
							</TabContainer>
						}
						{
							mainDrawerTabValue === 1 &&
							<TabContainer item>										
								<DasTab />								
							</TabContainer>							 
						}
				</Grid>
			</Grid>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	mainDrawerTabValue: mainDrawerTabValue()
});

function mapDispatchToProps(dispatch){
	return {
		changeMainDrawerTabValue: value => dispatch(changeMainDrawerTabValueAction(value))
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
