import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RiverIcon from '@material-ui/icons/Fingerprint';

import { getSectionIcon } from './helpers';
import { SECTIONS_MENU } from '../constants'
import SectionButton from '../SectionButton';

// vertical Tabs
import VerticalTabs from './VerticalTabs';

import DashboardTab from '../DashboardTab';

const Wrapper = styled.div`
		position: absolute;
		width: 38%;
		height:600px;
		top: 75px;
		left: 10px;			
`
class SectionContainer extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			tabValue:0,
		}
	}

	componentDidMount(){		
	}

	// horizontal tabs
	handleTabChange = (event, value) => {		
		this.props.onChangeTabValue(value);		
	}

	// sections utk icon di dashboard tab
	getSectionOptions(){	
		const sectionOptions = SECTIONS_MENU.map(opt=> ({
			value:opt.value,
			title:opt.title,
			icon:getSectionIcon(opt.value)
		}));
		return sectionOptions;
	}

	// getTabs
	getTabs(){
		return [
			{
				icon:DashboardIcon,
				label:'Dashboard'				
			},
			{
				icon:AssignmentIcon,
				label:'Project'				
			},
			{
				icon:RiverIcon,
				label:'Sungai'				
			},
		]
	}

	render(){
		const { tabValue, marker } = this.props;
		return (
			<Wrapper>
				<Card 
					style={{
						width:'100%', 
						height:'100%',
						backgroundColor:'none'
					}} 
					elevation={1}>

			      <CardContent style={{ padding:0 }}>
			      	<Grid 
			      		container 
			      		direction="row" 
			      		alignItems="stretch" 
			      		style={{ height:'100vh' }}>

				      	<Grid 
				      		item 
				      		xs={2} 
				      		style={{ backgroundColor:'none' }}>

					      	<VerticalTabs 
					      		value={ tabValue } 
					      		onChange = { this.handleTabChange }
					      		tabs={this.getTabs()} />
				      	</Grid>
				      	
				      	<Grid 
				      		item 
				      		xs={10} 
				      		style={{ 
				      			backgroundColor:'none' 
				      		}}>
						        {
						        	tabValue === 0 && 
						        	<Grid 
						        		container
						        		direction="column"						        		
						        		style={{						        			
						        			flexDirection:'column',
						        			padding:20,
						        			alignItems:'center'}}>

								        	<Typography 
								        		variant="h4" 
								        		color="inherit"
								        		align="left"
								        		style={{ fontSize:'14px'}}>
								        		Dashboard
								        	</Typography>
								        	
								        	<Grid 
								        		container 
								        		direction="row" 
								        		wrap="nowrap">
								        	{
								        		this.getSectionOptions().map(section=>{
								        			return (
								        				<SectionButton 
								        					key={section.label}
								        					label={section.title}
								        					size="small"
								        					icon={<section.icon />}
								        					 />
								        			);
								        		})
								        	}
								        	</Grid>		        		
						        	</Grid>
						        }

						        { 
						        	tabValue === 1 && <DashboardTab marker={marker} /> 
						        }
			        			{ tabValue === 2 && <div>tab 3</div>}						        
			        	</Grid>
			        </Grid>			        				        
			      </CardContent>
			    </Card>
			</Wrapper>
		);
	}
}

export default SectionContainer;