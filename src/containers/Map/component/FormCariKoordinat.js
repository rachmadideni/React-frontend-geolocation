import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class FormCariKoordinat extends Component {
	handleShowForm = () => {
		this.props.handleShowForm(!this.props.isOpen)
	}

	handleTextField = (name,value) => {		
		this.props.handleTextField(name,value);
	}

	handleSearchSubmit = () => {
		this.props.handleSearchSubmit();
	}

	render(){
		return (
			<Dialog 
				open = { this.props.isOpen }
				onClose = { this.handleShowForm }>
				<Grid 
					container 
					wrap="nowrap"
					style={{
						paddingTop:10,						
					}}>

					<Typography 
						variant="subtitle1" 
						gutterBottom 
						color="secondary"
						style={{
							paddingLeft:20,
							paddingBottom:0
						}}>
						cari koordinat
					</Typography>

					<form 
						noValidate 
						autoComplete="off"
						style={{
							padding:20,							
						}}>						

						<TextField 
							id="longitude" 
							placeholder="Longitude"
							value={this.props.LongPos}
							onChange={event=>this.handleTextField('LongPos',event.target.value)}
							fullWidth />

						<TextField 
							id="latitude" 
							placeholder="Latitude"
							value={this.props.LatPos}
							onChange={event=>this.handleTextField('LatPos',event.target.value)}
							fullWidth />

						<Button 
						  variant="contained" 
						  size="small"
						  color="primary"
						  fullWidth
						  style={{
						  	marginTop:10
						  }}
						  onClick={this.handleSearchSubmit}>
						  Submit
						</Button>	

					</form>
				</Grid>
			</Dialog>
		);
	}
}

FormCariKoordinat.propTypes = {
	isOpen: PropTypes.bool,
	handleShowForm: PropTypes.func
}

export default FormCariKoordinat;