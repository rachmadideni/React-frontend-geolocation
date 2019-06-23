import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import saga from '../../../../Map/saga';
import injectSaga from '../../../../../utils/injectSaga';

import { 
	getOptionsAction,
	pushRiverPropKeyValAction,
	addRiverAction, } from '../../../../Map/action';

import { 
	makeSelectOptions,
	makeSelectRiverFeatures } from '../../../../Map/selectors';

class AddRiver extends Component{
	constructor(props){
		super(props);
		this.state = {
			kecamatan:'',
			sungai:''
		}
		this.handleSubmit = this.handleSubmit.bind(this); 
	}

	componentDidMount(){		
		this.props.getOptions('kecamatan');
		// console.log('selectRiverFeatures:',this.props.selectRiverFeatures);
	}

	handleChange = (event, name) => {	
		this.setState({
			[name]:event.target.value
		})   
	};

	handleSubmit(e){
		e.preventDefault();
		let nmsung = this.state.sungai;
		let idkecm = this.state.kecamatan;
		let { selectRiverFeatures } = this.props; 
		this.props.pushRiverPropKeyVal({ nmsung, idkecm }); // tambahkan properti nmsung,idkecm ke features
		this.props.addRiver(selectRiverFeatures); // POST api calls untuk simpan features 
	}

	render(){
		
		const { 
			kecamatan,
			sungai } = this.state;

		let { 
			options,
			// selectRiverFeatures 
		} = this.props;
		
		// console.log(selectRiverFeatures[0].properties);
		// prop.hasOwnProperty('nmsung')
		/*if(selectRiverFeatures.length > 0){
			let riverProp = selectRiverFeatures[0].properties 
			let nmsung2 = riverProp.hasOwnProperty('nmsung') ? riverProp.nmsung : sungai;
			let idkecm2 = riverProp.hasOwnProperty('idkecm') ? riverProp.idkecm : kecamatan;
		}else{
			let nmsung2 = '';
			let idkecm2 = '';
		}*/

		return (
			<Grid 
					item 
					xs 
					style={{ width:'90%' }}>
			
					<form 
						noValidate 
						autoComplete="off">

						<Typography 
							variant="h6" 
							gutterBottom 
							style={{
								marginTop:20
							}}>
								Attribute Sungai
							</Typography>
						
						<Typography 
							variant="body1" 
							gutterBottom>
							fitur untuk menambahkan informasi sungai
						</Typography>			
						
						<TextField 
							id = "nmsung" 							
							label = "Nama Sungai" 
							value = { sungai } 
							onChange = { event => this.handleChange(event, 'sungai') } 
							margin = "normal" 
							fullWidth />

						<TextField 
							select 
							id = "nmkecm" 
							label = "Nama kecamatan" 
							value = { kecamatan } 
							onChange = { event => this.handleChange(event, 'kecamatan') } 
							margin = "normal" 
							fullWidth>
							{options.kecamatan.map(option => (
			          <MenuItem key={option.value} value={option.value}>
			            {option.label}
			          </MenuItem>
			        ))}
						</TextField>
						<Button 							
									variant="contained"
									color="secondary"
									fullWidth
									onClick={this.handleSubmit}
									style={{ marginTop:10 }}>
									Simpan
						</Button>
					</form>

				</Grid>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	options:makeSelectOptions(),
	selectRiverFeatures: makeSelectRiverFeatures()
})

function mapDispatchToProps(dispatch){
	return {
		getOptions: key=>dispatch(getOptionsAction(key)),		
		pushRiverPropKeyVal: (value)=>dispatch(pushRiverPropKeyValAction(value)),
		addRiver: ()=>dispatch(addRiverAction()),
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withSaga = injectSaga({ key: 'mapContainer', saga });

export default compose(withSaga, withConnect)(AddRiver);