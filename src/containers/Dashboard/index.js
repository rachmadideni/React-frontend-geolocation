import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuList from './DrawerMenu';

// page
import DashboardOverviewPage from '../DashboardOverviewPage';
import MapDraw from '../Map';
import MapUtama from '../MapRevised'

import { createStructuredSelector } from 'reselect';
import { makeSelectDrawerState } from '../Map/selectors';
import { changeDrawerStateAction } from '../Map/action';

class Dashboard extends React.Component {

	toggleDrawer = () => {		
    const { 
    	drawerState 
    } = this.props;
    return this.props.changeDrawerState(!drawerState);
	}

	render(){
		
		const { 
			history, 
			drawerState 
		} = this.props;

		return (
			<Grid 
				container 
				direction="column"
				wrap="nowrap" 
				style={{ 
					width:'100%',
					height:'100vh' 
				}}>

				<Grid 
					item 
					display="flex">
					
					<AppBar 
						elevation={0} 
						position="static" 
						color="primary">

						<Toolbar>							
							<IconButton 
								onClick={ this.toggleDrawer }>
								<MenuIcon 
									fontSize="small" 
									style={{ 
										color: 'white'
									}} />
							</IconButton>							
							<Typography 
								variant="h6" 
								color="inherit" 
								style={{ 
									flexGrow: 1,
									fontSize:18,
									paddingLeft:10 
								}}>
									{'webgis'}
							</Typography>
							<IconButton disableRipple>
								<AccountIcon 
									fontSize="small" 
									style={{ 
										color:'white'
									}} />
							</IconButton>
						</Toolbar>

						<Drawer 
							style = {{ 
								color:'#333333' 
							}}
							open = { drawerState }
							onClose = { this.toggleDrawer }>							
							<MenuList />
						</Drawer>

					</AppBar>
				</Grid>
				
				<Grid 
					item
					display="flex"					
					style={{
            width: '100vw',
            flex: '1',
            marginTop: '0px',
            padding: '0px',
            backgroundColor: 'white',
	        }}>
					<Switch>

						<Route 
							exact 
							path="/dashboard" 
							render = {() => <MapUtama history = { history } /> } />

						<Route 
							exact 
							path="/draw/:type(river|project)" 
							render = {() => <MapDraw history = { history } /> } />							

					</Switch>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	drawerState: makeSelectDrawerState(),
});

function mapDispatchToProps(dispatch){
	return {
		changeDrawerState: value => dispatch(changeDrawerStateAction(value)),
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(	
	withConnect
)(Dashboard);