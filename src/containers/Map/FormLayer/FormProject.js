import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
	uploadProjectAction,
	hapusProjectAction
} from '../../Map/action';

import { 
	Wrapper,
	FormWrapper,
	FormInnerWrapper,
	FormHeader,
	ActionButton } from '../../../components/Form';

import isEmpty from 'validator/lib/isEmpty';
import moment from 'moment';

import { api } from '../../../environtments';
import ImgsViewer from 'react-images-viewer'

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
			isValidSubmit:false,
			isImageViewerOpen:false,
			imageList:[]
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this._getProjectDate = this._getProjectDate.bind(this); 
	}

	componentDidMount(){
		// console.log(moment().format('YYYY-MM-DD'));	
		// console.log(this.props.dt.tglpro);
		// console.log('history:',this.props);
	}

	_getProjectDate(){
		const { tglpro } = this.props.dt;
		// console.log(moment().toDate());
		if(!tglpro){
			return {
				// tglpro:moment().toDate()
				tglpro:new Date().toISOString().substring(0, 10)				
			}
		}

		return {
      tglpro: moment(tglpro).toDate(),
      displayDate: moment(tglpro).format('YYYY-MM-DD')      
    };
	}

	componentDidUpdate(props,state){

		if (props.featureId !== this.props.featureId) {
		// if (this.props.featureId !== state.featureId) {
			// console.log()
			if (this.props.featureId) {				
				this.props.getProjectAttribute(this.props.featureId);// call saga utk ambil atribut								
			}

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
			// keterangan
		} = this.props.dt

		const {
			addProject
		} = this.props

		const { features } = this.state;
		
		this.setState({
			isSubmitted:true
		})
		  
		if(this.validasiNamaProject(nampro) && this.validasiTanggalProject(tglpro)){
			// alert('lolos validasi');
			// console.log('check history:',this.props);			
			addProject({
				features,
				properties:this.props.dt
			});
			// return <Redirect to="/signin" />
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

	_renderFiles = () => {

		const { 
			upload, 
			id 
		} = this.props.dt;
		
		const { 
			featureId 
		} = this.state;
		
		if(upload.length > 0){
			return upload.map((item,index)=>{
				return (
					<a 						
						onClick={
							(featureId && id) ? e=>this._handleImageToShow(e,index) : false 
						} 
						key={index} >
						<img alt=""
							style={{
								width:'55px',
								height:'55px',
								border:'solid 1px #354577',							
								margin:'5px',
								padding:'2px'
							}} src={`${api.host}/api/static/${item.filename}`}></img></a>				
				);
			})			
		}
		
		return (
			<h4>tidak ada file upload</h4>
		);

	}

	_closeImageViewer = () => {
		this.setState((state,props)=>{
			return {
				isImageViewerOpen:false
			}
		})
	}

	_handleImageToShow = (e,index) => {
		e.preventDefault();

		const { upload } = this.props.dt	
		const n = [];
		n.push({src:`${api.host}/api/static/${upload[index].filename}`})
		this.setState((state,props)=>{
			return {
				isImageViewerOpen:true,
				imageList:n
			}
		});

	}

	_renderImgViewer = () => {
		return (
			<React.Fragment>
				<ImgsViewer
					isOpen={this.state.isImageViewerOpen}
					onClose={this._closeImageViewer}
					imgs={this.state.imageList}
					showThumbnails={false} />			
			</React.Fragment>
		);		
	}

	_handleDelete = () => {
		const { featureId } = this.state;
		const d = window.confirm('anda akan menghapus Project');
		if(d === true){
			this.props.hapusProject(featureId);
			this.props.clearProjectForm();
		}
	}

	render(){

		const { 
			featureId,			
		} = this.state;

		const {
			dt,
			ubahNamaProject,
			ubahTanggalProject,
			ubahKeteranganProject
		} = this.props;


		return (
			
			<Wrapper 
				
				direction="column" 
				style={{ display:'flex' }}>

				{this._renderImgViewer()}

				<FormWrapper>
					<FormInnerWrapper
						
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

									
								</Grid>
							</Grid>
						</Grid>
					</FormInnerWrapper>
					{/*
						defaultValue={this._getProjectDate().displayDate}
						value={this._getProjectDate().displayDate}					
					*/}
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
							value = { this._getProjectDate().displayDate }
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
			      		height:'35px',
			      		marginBottom:'15px'
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

							<div style={{
								flex:1,
								width:'100%',
								height:'150px',
								marginBottom:'50px',
								paddingBottom:'20px'
							}}>
							{this._renderFiles()}							
							</div>

						</div>

						<Grid style={{ paddingTop:'55px' }}>

						<ActionButton 									
								size="small" 
								variant="contained" 
								success="true"
								onClick = { this.handleSubmit }										
								fullWidth
								disabled = { 
									featureId ? false : true || !!this.state.error.nampro
								}>
								Simpan Atribut
							</ActionButton>
			 
							<ActionButton 
								size="small" 
								variant="contained"
								success={false} 
								fullWidth 
								onClick={this._handleDelete} 
								disabled = { 
									featureId ? false : true || !!this.state.error.nampro
								}>
								Hapus Project
							</ActionButton>

						</Grid>

					</form>
				</FormWrapper>
			</Wrapper>
		);
	}
}

FormProject.propTypes = {
	featureId: PropTypes.string,
  // features: PropTypes.object,
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
		uploadProject: file=>dispatch(uploadProjectAction(file)),
		hapusProject: featureId => dispatch(hapusProjectAction(featureId))		
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(FormProject);