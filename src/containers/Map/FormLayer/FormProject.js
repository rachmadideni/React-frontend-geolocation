import React from 'react';
import PropTypes from 'prop-types';
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
	addProjectAction,
	uploadProjectAction
} from '../../Map/action';

import { 
	Wrapper,
	FormWrapper,
	FormInnerWrapper,
	FormHeader,
	ActionButton } from '../../../components/Form';

import isEmpty from 'validator/lib/isEmpty';
import moment from 'moment';

/* UPLOAD Component */
class UploadComp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			upload:[0,1,2]
		}
	}

	_addUploadItem = (index,event) => {
		/*console.log(index);
		console.log(event);
		const upload = this.state.upload.slice();//copy
		upload[index] = event.target.value;
		this.setState({
			upload:upload
		})*/
	}

	_renderUpload = () => {
		const { upload } = this.state;
		return upload.map((item,index)=>{
			return (		
				<div key={index}>				
					<input 
						type="file" 
						value="" />
					<Button 
					  variant="contained" 
					  size="small"
					  onClick={this._addUploadItem(index)}>
					  +
					</Button>					
				</div>			
			);
		});		
	}

	render(){
		const {
			upload
		} = this.state;

		return (
			<React.Fragment>
			{this._renderUpload()}
			</React.Fragment>
		)
	}
}

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
			isSubmitted:false,
			files:null,
		}
		this.handleSubmit = this.handleSubmit.bind(this); 
	}

	componentDidMount(){
		console.log(moment().format('YYYY-MM-DD'));
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

	_handleFileUploadChanges = (event) => {
		console.log('event.target.files :', event.target.files[0]);
		if(!!event.target.files && !!event.target.files[0]){			
			this.setState({
				files:event.target.files[0]
			})
		}
		return false;
	}

	_handleUpload = () => {
		// console.log(file);
		const { files } = this.state;
		const { id } = this.props.dt;
		this.props.uploadProject({ files, id });
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
			
			<Wrapper 
				container 
				direction="column" 
				style={{ display:'flex' }}>

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
							defaultValue={new Date().toString()}							
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

			      <div 
			      	style={{ 
			      		backgroundColor:'none',
			      		height:'35px'
			      	}}>

							<input 
								type="file" 
								name="project"
								accept="image/*"
								disabled={ (featureId && dt.id) ? false : true } 
								onChange={this._handleFileUploadChanges} />
							
							<Button 
							  variant="contained" 
							  size="small"
							  success={true}
							  onClick={this._handleUpload}
							  disabled={ (featureId && dt.id) ? false : true }>
							  upload
							</Button>					
						</div>

			      

					</form>
				</FormWrapper>
			</Wrapper>
		);
	}
}

FormProject.propTypes = {
	featureId: PropTypes.string,
  features: PropTypes.array,
  dt: PropTypes.object,// form data
  validasiNamaProject: PropTypes.func,
  validasiTanggalProject: PropTypes.func,
  ubahNamaProject: PropTypes.func,
  ubahTanggalProject: PropTypes.func,
  ubahKeteranganProject: PropTypes.func,
  getProjectAttribute: PropTypes.func,
  addProject: PropTypes.func,
  handleSubmit: PropTypes.func
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
		addProject: features=>dispatch(addProjectAction(features)),
		uploadProject: file=>dispatch(uploadProjectAction(file))		
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(FormProject);