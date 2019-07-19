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
	getOptionsAction, 
	pilihJenisSungaiAction,
	ubahNamaSungaiAction,
	ubahJenisSungaiAction,
	ubahKecamatanAction,
	ubahKeteranganAction,
	getRiverAttributeAction,
	addRiverAction,
	hapusSungaiAction,
	getRiverAction,
	updateRiverPropertyAction
} from '../../Map/action';

import { 
	makeSelectOptions,
	makeSelectJenisSungai,
	makeSelectFormRiverData } from '../../Map/selectors';

import isEmpty from 'validator/lib/isEmpty';

import Slide from '@material-ui/core/Slide';

function Transition(props){
	return <Slide direction="up" {...props} />;
}

const Wrapper = styled(Grid)`
	&& {
		width:30vw;
		padding:0;
		position:absolute;
		top:20px;
		left:20px;
		padding-top:15px;
		padding-bottom:15px;
		padding-left:28px;
		padding-right:28px;
	}
`
const FormWrapper = styled(Grid)`
	&& {
		width:100%;		
		border-radius:0;
		box-shadow:none;
	}
`

const ActionButton = styled(Button).attrs({
	classes:{ root:'root',disabled:'.disabled',label:'label' }
})`
	.label {
		text-transform:capitalize;
	}
	&&{
		color:white;
		background-color:${props=>props.success ? color.success : color.danger};
		box-shadow:none;
		margin-bottom:5px;
		margin-right:5px;
		'&::hover': {
			background-color:'orange'
		}
	}
`

const HeaderStyled = styled(Grid)`
	width:60%;
	border-radius:0;
	box-shadow:none;
`

function FormHeader(props){
	return (
		<HeaderStyled>
			<Typography 
				align="left" 
				color="secondary" 
				variant="subtitle2">
					{props.judul}
			</Typography>
		</HeaderStyled>
	)
}

const FormInnerWrapper = styled(Grid)`
	display:flex;
	width:100%;
	border-radius:0;
	box-shadow:none;
`

class FormRiverAttributes extends React.Component{
	constructor(props){
		super(props);
		this.state = {			
			featureId:this.props.featureId,
			features:[],
			idsung:null,			
			sungai:'',
			kecamatan:null,
			jenis_sungai:"1",
			keterangan:'',
			error:{
				kecamatan:null,
				sungai:null,
				jenis_sungai:null
			},
			isSubmitted:false,
		}

		this.handleSubmit = this.handleSubmit.bind(this); 
	}

	componentDidUpdate(props,state){
		
		// console.log('___________________');
		// console.log('child updated!');		
		//console.log('props.featureId = ' + props.featureId + ', this.props.featureId = ' + this.props.featureId);
		// console.log('state idsung = ' + state.idsung + ', this.props.idsung = ' + this.props.idsung);
		// console.log(props.featureId);		
		// console.log('state',state);
		
		//if(this.props.featureId !== state.featureId){
						
		// if(props.idsung !== this.props.idsung){			
		// console.log('kondisi:', props.featureId !== this.props.featureId)
		// console.log(props.featureId);				
		
		/*if (props.featureId !== this.props.featureId) {			
			
			if(this.props.idsung){
				this.props.getRiverAttribute(this.props.idsung);// call saga utk ambil atribut				
			}

			this.setState( state => {
				return {
					featureId: this.props.featureId,
					features: this.props.features,
    			idsung: this.props.idsung
				}
			});

		}*/	

		// penting harus ada. klo tdk ada user tdk bisa update properti sungai yang baru dibuat
		console.log(this.state.featureId)
		console.log(this.props.featureId)
		if(this.props.featureId !== state.featureId){
			this.setState(state=>{
				return {
					featureId:this.props.featureId
				}
			})
		}
		
	}

	validasiSungai(nama_sungai){
		let isError = false;
		let errorMsg = null;
		if(isEmpty(nama_sungai)){
			isError = true;
			errorMsg = "Nama Sungai tidak boleh kosong"
		}else{
			isError = false;
			errorMsg = null
		}

		this.setState(state=>{
			return {
				error:{
					sungai:errorMsg
				}
			}
		})
		return !isError;
	}

	validasiKecamatan(kecamatan){
		let isError = false;
		let errorMsg = null;		
		
		if(!kecamatan && this.props.featureId){
			isError = true;
			errorMsg = "Kecamatan tidak boleh kosong"
		}else{
			isError = false;
			errorMsg = null
		}

		this.setState(state=>{
			return {
				error:{
					kecamatan:errorMsg
				}
			}
		})
		return !isError;	
	}

	componentDidMount(){
		this.props.getOptions('kecamatan');		
	}	

	
	
	// simpan ke state komponen
	handleChange = (event, name) => {	
		this.setState({
			[name]:event.target.value
		})   
	};

	resetForm = () => {

		this.setState((state,props)=>{
			//console.log(props.featureId);
			return {
				kecamatan:'',
				sungai:'',
				jenis_sungai:"1",
				keterangan:'',
				idsung:''				
			}
		})

		this.props.pilihJenisSungai(1);
	}

	handlePilihSungai = (event,value) =>{
		return this.props.pilihJenisSungai(value)		
	}

	handleSubmit(event){
		event.preventDefault();

		const {
			sungai,
			kecamatan			
		} = this.props.dt

		const {
			features
		} = this.state

		this.setState({
			isSubmitted:true
		})

		if(this.validasiSungai(sungai) && this.validasiKecamatan(kecamatan)){
			alert('lolos validasi');
			// alert(this.state.featureId);			
			// alert(this.props.dt.sungai);
			// console.log('state:',this.state.features);
			
			// disabled semenetra
			/*this.props.addRiver({ 
				features, 
				properties:this.props.dt 
			});*/

			// tes update property
			// console.log(this.props.featureId);
			const property = this.props.dt;
			/*
			property = {
				kecamatan:2,
				sungai:"tb2",
				jenis_sungai:"2",
				keterangan:"tb2",
				idsung:null
			}
			 */
			
			// isi properti sungai (setelah user membuat sungai baru)
			this.props.updateRiverProperty({
				featureId:this.state.featureId,
				property:property
			});

			this.props.handleFormOpen(false);
			this.props.clearRiverForm();
		}

		return false;
	}

	handleDelete = () => {		
		const { featureId } = this.state;
		const d = window.confirm('anda akan menghapus sungai')
		if(d === true){
			this.props.hapusSungai(featureId);
			// this.props.getRiver();			
			// this.forceUpdate()
		}
	}

	render(){

		const { 
			featureId,
			// kecamatan,
			// sungai,
			// jenis_sungai,
			// keterangan 
		} = this.state;
		
		const { 
			options,
			dt,
			ubahNamaSungai,
			ubahJenisSungai,
			ubahKecamatan,
			ubahKeterangan } = this.props;		
		
		return(
			<Slide direction="right" in={this.props.isFormOpen} mountOnEnter unmountOnExit>
			<Wrapper 				
				container="true"
				direction="column"				
				style={{
					display:'flex',					
				}}>
						
				<FormWrapper>										
					<FormInnerWrapper 
						container="true"
						direction="column"
						style={{
							display:'flex',
							borderRadius:'0',
							boxShadow:'none',
							width:'100%',
						}}>						

						<FormHeader judul="Atribut Sungai" />

						<Grid 
							item="true"
							style={{ 
								width:'40%',
								borderRadius:'0',
								boxShadow:'none'								
							}}>
							
							<Grid 
								container="true" 
								direction="row" 								
								style={{									
									borderRadius:'0',
									boxShadow:'none',
									alignItems:'center',
									justifyContent:'space-between',									
								}}>
								
								<Grid item="true" style={{									
									borderRadius:'0',
									boxShadow:'none',
								}}>
																		
								</Grid>
							</Grid>

						</Grid>						
					</FormInnerWrapper>

				{/* disabled={featureId ? false: true} */}
				{/*
						di action button :
						disabled = { featureId ? false : true || !!this.state.error.sungai }
						disabled = { featureId ? false : true || !!this.state.error.sungai }
				*/}
					<form 
						noValidate 
						autoComplete="off" 						
						onSubmit={this.handleSubmit}>

						<TextField 
							id="attr1" 
							label="nama sungai" 
							autoFocus={true}
							
							value={dt.sungai}
							onChange = { 
								event =>{
									if(this.state.isSubmitted){
										this.validasiSungai(event.target.value)
									}

									return ubahNamaSungai(event.target.value)
									//return this.handleChange(event, 'sungai') 
							}} 
							margin="normal" 
							fullWidth 
							error={!!this.state.error.sungai}
							helperText={this.state.error.sungai} />

						{/* simpan ke state : sungai */}
						
						<FormLabel 
							component="legend">
							Tipe
						</FormLabel>
						
						<RadioGroup 
							value = { dt.jenis_sungai }
							onChange = { 
								event=> {
									return ubahJenisSungai(event.target.value)
									//this.handleChange(event,'jenis_sungai')
								}}>
							<FormControlLabel 								
								value="1" 
								label="sungai utama" 
								control={<Radio />} labelPlacement="end" />

							<FormControlLabel 								
								value="2" 
								label="anak sungai" 
								control={<Radio />} labelPlacement="end" />
						</RadioGroup>

						{/* simpan ke state : jenis_sungai */}						
						
						<TextField 
							select 							
							id = "nmkecm" 							
							value = {dt.kecamatan} 
							onChange = { event => {
								if(this.state.isSubmitted){
									this.validasiKecamatan(event.target.value)
								}
								return ubahKecamatan(event.target.value)
								//return this.handleChange(event, 'kecamatan')	
							}} 
							margin = "normal" 
							fullWidth
							error={!!this.state.error.kecamatan}
							helperText={this.state.error.kecamatan}>
							{options.kecamatan.map(option => (
			          <MenuItem key={option.value} value={option.value}>
			            {option.label}
			          </MenuItem>
			        ))}
						</TextField>

					{/* simpan ke state : kecamatan */}

						<TextField 
							multiline
							rows={3}							
							id="attr3" 
							label="keterangan" 
							value={dt.keterangan}
							onChange = { event => {
								return ubahKeterangan(event.target.value)
								//this.handleChange(event, 'keterangan')
							}}
							margin="normal" 
							fullWidth />

					{/* simpan ke state : keterangan */}

						<ActionButton 									
							size="small" 
							variant="contained" 
							success={true}
							fullWidth
							onClick = { this.handleSubmit }										
							color="primary"
							>
							Simpan Atribut
						</ActionButton>

						<ActionButton 									
							size="small" 
							variant="contained" 
							success={false}										
							fullWidth
							onClick = { this.handleDelete }																				
							>
							Hapus
						</ActionButton>

					</form>
				</FormWrapper>
			</Wrapper>
			</Slide>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	options:makeSelectOptions(),
	jenis_sungai:makeSelectJenisSungai(),
	dt:makeSelectFormRiverData()
})

function mapDispatchToProps(dispatch){
	return {
		getOptions: key=>dispatch(getOptionsAction(key)),
		pilihJenisSungai: value=>dispatch(pilihJenisSungaiAction(value)),
		ubahNamaSungai:value=>dispatch(ubahNamaSungaiAction(value)),
		ubahJenisSungai:value=>dispatch(ubahJenisSungaiAction(value)),
		ubahKecamatan:value=>dispatch(ubahKecamatanAction(value)),
		ubahKeterangan:value=>dispatch(ubahKeteranganAction(value)),
		getRiverAttribute: idsung=>dispatch(getRiverAttributeAction(idsung)),
		addRiver: features=>dispatch(addRiverAction(features)),
		hapusSungai: value=>dispatch(hapusSungaiAction(value)),
		getRiver: ()=>dispatch(getRiverAction()),
		updateRiverProperty: (property)=>dispatch(updateRiverPropertyAction(property))
	}
}



const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(FormRiverAttributes);