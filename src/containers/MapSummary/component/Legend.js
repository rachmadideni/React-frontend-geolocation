import React from 'react';
import styled from 'styled-components';

import {
	List,
	ListSubheader,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemAvatar,
	Collapse,
	Avatar,
	Typography
} from '@material-ui/core'; 

import { green, blue, orange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

import { 
	LinearScale,
	RoomSharp,
	ExpandLess,
	ExpandMore,
	Timeline
} from '@material-ui/icons';

const CListItem = styled(ListItem).attrs({
	classes:{
		root:'root',
		button:'button'		
	}
})
`
	.root {
		&:hover {
			background-color:green[200];	
		}
	}
	&& {		
		// height:20px;
		// padding:10px;
		// margin-bottom:5px;		
	}
`

const InnerListItem = styled(ListItem)`
	&& {
		height:40px;
	}
`

class Legend extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			dataProyek:null,
			dataSungai:null
		}
	}

	componentDidMount(){
		this.setState({
			dataProyek:this.props.projectData,
			dataSungai:this.props.riverData			
		})
	}

	toggle = event => {
		this.props.toggle(event);
	}

	renderProyek = (data) => {
		const { features } = this.props.projectData;
		if(features){
			const dt = features.map( (item,i)=>{
				return (					
					<List 
						component="span" 
						disablePadding
						style={{
							height:'400px'
						}}>
						<InnerListItem
							alignItems="flex-start"
							button 
							style={{ 
								paddingLeft:60 
							}}>
							{/*<RoomSharp style={{ fontSize:12,color:`${this.props.color}` }}/>*/}
							<ListItemText 
								primary={
									<React.Fragment>
									<Typography component="span" variant="body2">
										{item.properties.nampro}
									</Typography>
									</React.Fragment>
								}>
							
							</ListItemText>
						</InnerListItem>
					</List>					
				);
			});
			return dt;			
		}
	}

	renderSungai = () => {		
		const { features } = this.props.riverData;
		if(features){
			const dt = features.map( (item,i)=>{
				return (
					<List 
						component="div" 
						disablePadding>
						<InnerListItem
							alignItems="flex-start"
							button 
							style={{ 
								paddingLeft:60 
							}}>
							{/*<RoomSharp style={{ fontSize:12,color:`${this.props.color}` }}/>*/}
							<ListItemText 
								primary={
									<React.Fragment>
									<Typography component="span" variant="body2">
										{item.properties.nmsung}
									</Typography>
									</React.Fragment>
								}>
							
							</ListItemText>
						</InnerListItem>
					</List>
				);
			});
			return dt;			
		}
	}
	
	render(){
		
		const { 			 
			dataProyek,
			dataSungai 
		} = this.state;		
				
		return (										
			<List 
				component="div" 
				disablePadding>

				<CListItem 
					button 
					style={{ 
						paddingLeft:10 
					}}
					onClick={e=>this.toggle(this.props.name)}>

					<ListItemAvatar>
						<React.Fragment>
							<Avatar style={{ backgroundColor:'#f7f7f7' }}>
								{	this.props.name === 'sungai' ? 
									<Timeline style={{ fontSize:18,color:`${this.props.color}`, }}/> : 
									<RoomSharp style={{ fontSize:18,color:`${this.props.color}`, }}/>
								}
							</Avatar>								
						</React.Fragment>																											
					</ListItemAvatar>

					<ListItemText primary={this.props.name} />
					{ this.props.expand ? <ExpandLess /> : <ExpandMore /> }
				</CListItem>
				<Collapse 
					in={this.props.expand} 
					timeout="auto" 
					unmountOnExit>
					{ this.props.selectedList === 'proyek' ? this.renderProyek() : this.renderSungai() }
				</Collapse>					
			</List>		
		);
	}
} 	

	

export default withStyles()(Legend);