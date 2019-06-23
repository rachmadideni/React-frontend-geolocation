import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { color } from '../../../styles/constants'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	makeSelectFormProjectData
} from '../../Map/selectors';
import {
	ubahNamaProjectAction,
	ubahTanggalProjectAction,
	ubahKeteranganProjectAction,
	getProjectAttributeAction,
	addProjectAction
} from '../../Map/action';

import { 
	Wrapper,
	FormWrapper,
	FormInnerWrapper,
	FormHeader,
	ActionButton } from '../../../components/Form';

import isEmpty from 'validator/lib/isEmpty';

class FormProject extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			featureId:null,
			features:[],
			error:{
				nampro:null,
				tglpro:null
			},
			isSubmitted:false
		}
		this.handleSubmit = this.handleSubmit.bind(this); 
	}

	componentDidUpdate(props,state){
		if(props.featureId !== this.props.featureId){
			if(this.props.featureId){
				this.props.getProjectAttribute(this.props.featureId);// call saga utk ambil atribut				
			}
			// console.log('features geometry:',this.props.features[0].geometry.coordinates)
			this.setState((state)=>{
				return {
					featureId:this.props.featureId,
					features:this.props.features
				}
			})
		}		
	}

	handleSubmit(event){
		event.preventDefault();
		const {
			nampro,
			tglpro,
			keterangan
		} = this.props.dt

		const { features } = this.state;
		console.log({ features });
		this.setState({
			isSubmitted:true
		})
		//  
		if(this.validasiNamaProject(nampro) && this.validasiTanggalProject(tglpro)){
			alert('lolos validasi');
			this.props.addProject({
				features,
				properties:this.props.dt
			})
		}

		return false;

	}

	validasiNamaProject(nama_project){
		let isError = false;
		let errorMsg = null;
		if(isEmpty(nama_project)){
			isError = true;
			errorMsg = "Nama Project tidak boleh kosong"
		}else{
			isError = false;
			errorMsg = null
		}

		this.setState(state=>{
			return {
				error:{
					nampro:errorMsg
				}
			}
		})
		return !isError;
	}

	validasiTanggalProject(tanggal_project){
		// console.log(tanggal_project);
		let isError = false;
		let errorMsg = null;
		if(isEmpty(tanggal_project)){
			isError = true;
			errorMsg = "Tanggal Project tidak boleh kosong"
		}else{
			isError = false;
			errorMsg = null
		}

		this.setState(state=>{
			return {
				error:{
					tglpro:errorMsg
				}
			}
		})
		return !isError;
	}

	render(){

		const { 
			featureId 
		} = this.state;

		const {
			dt,
			ubahNamaProject,
			ubahTanggalProject,
			ubahKeteranganProject
		} = this.props;

		return (
			<Wrapper container direction="column" style={{ display:'flex' }}>
				<FormWrapper>
					<FormInnerWrapper
						container
						direction="column"
						style={{
							display:'flex',
							borderRadius:'0',
							boxShadow:'none',
							width:'100%',
						}}>

						<FormHeader judul="Atribut Project" />

						<Grid 
							item
							style={{ 
								width:'40%',
								borderRadius:'0',
								boxShadow:'none'								
							}}>

							<Grid 
								container 
								direction="row" 								
								style={{									
									borderRadius:'0',
									boxShadow:'none',
									alignItems:'center',
									justifyContent:'space-between',									
								}}>
								
								<Grid 
									item 
									style={{									
										borderRadius:'0',
										boxShadow:'none',
									}}>

									<ActionButton 									
											size="small" 
											variant="contained" 
											success="true"
											onClick = { this.handleSubmit }										
											fullWidth
											disabled = { 
												featureId ? false : true || !!this.state.error.nampro }>
											Simpan Atribut
										</ActionButton>
								</Grid>
							</Grid>
						</Grid>
					</FormInnerWrapper>
					<form
						noValidate 
						autoComplete="off" 
						disabled={featureId ? false: true}
						onSubmit={this.handleSubmit}>

						<TextField 
							id="nampro"
							label="nama project"
							autoFocus
							disabled={featureId ? false: true} 
							margin="normal"
							fullWidth
							value={dt.nampro}
							error={!!this.state.error.nampro}
							helperText={this.state.error.nampro}
							onChange={
								event => {
									if(this.state.isSubmitted){
										this.validasiNamaProject(event.target.value)
									}
									return ubahNamaProject(event.target.value)
								}
							} />

						<TextField 
							id="tglpro"
							label="tanggal project"
							type="date"
							defaultValue="2017-05-24"
							value={dt.tglpro}
							disabled={featureId ? false: true}
							InputLabelProps={{
			          shrink: true,
			        }} 
			        style={{
			        	width:'100%'
			        }}
			        onChange={
								event => {
									if(this.state.isSubmitted){
										this.validasiTanggalProject(event.target.value)
									}
									return ubahTanggalProject(event.target.value)
								}
							} />

			      <TextField 
			      	id="keterangan"
			      	label="keterangan"
			      	multiline
			      	rows={5} 
			      	margin="normal"
			      	fullWidth
			      	value={dt.ketera}
			      	onChange={ event=>{
			      		return ubahKeteranganProject(event.target.value)
			      	}}
			      	disabled={featureId ? false: true}
			      	 />

					</form>
				</FormWrapper>
			</Wrapper>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	dt:makeSelectFormProjectData()
})

function mapDispatchToProps(dispatch){
	return {
		ubahNamaProject: value=>dispatch(ubahNamaProjectAction(value)),
		ubahTanggalProject: value=>dispatch(ubahTanggalProjectAction(value)),
		ubahKeteranganProject: value=>dispatch(ubahKeteranganProjectAction(value)),
		getProjectAttribute: featureId=>dispatch(getProjectAttributeAction(featureId)),
		addProject: features=>dispatch(addProjectAction(features))		
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(FormProject);