import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PengaturanMap from './Map';
// import PengaturanUser from './User';

class Pengaturan extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tabValue:0,
			mapStyleValue:'street'
		}
	}

	handleTab = (event,value) => {
		this.setState({
			tabValue:value
		})
	}
	render(){
		const { tabValue } = this.state;
		return (
			<Grid 
				container
				direction="column" 
				wrap="nowrap"
				style={{
					paddingLeft:30,
					paddingRight:0,
					width:'100%'
				}}>

				<Tabs 
					value = { tabValue } 
					onChange = { this.handleTab }>
					<Tab label="STYLE MAP" />
					{/*<Tab label="User" />					*/}
				</Tabs>
				{ 
					tabValue === 0  && 
					<PengaturanMap />
				}
				{/*
					tabValue === 1 && 
					<PengaturanUser />
				*/}
			</Grid>
		);
	}
}

export default Pengaturan;