import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import LoadingDialog from '../../components/LoadingDialog';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { makeSelectLoading, makeSelectErrorMessage, makeSelectIsShapeFileUploaded } from './selector';
import { uploadShapeAction } from './action';

class UploadShapePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			files:null
		}
	}

	handleUpload = ({target}) => {
		// http://jsfiddle.net/ashalota/ov0p4ajh/10/

		// console.log(target.files[0]);

		const fileReader = new FileReader();
		const name = target.accept.includes('shp') ? 'shape' : 'json';
		// console.log(target.files[0].name);
		// if(target.files[0].name.slice(-3) !== 'shp'){
		// 	alert('bukan shape file');
		// }
		fileReader.readAsDataURL(target.files[0]);
		fileReader.onload = (e) => {
			// console.log(fileReader.readyState);
			// console.log(fileReader.error);
			if(fileReader.readyState !== 2 || fileReader.error){
				return; 
			}

			// console.log(fileReader.result);

			this.setState({
				files:fileReader.result
			});

			this.props.uploadShape(target.files[0]);

			
			// https://stackabuse.com/read-files-with-node-js/
		}
	}

	render(){
		return (
			<Grid 
				container 
				wrap="nowrap" 
				direction="column">

				<LoadingDialog 
					isLoading={this.props.isLoading} />

				<Grid 
					container 
					wrap="nowrap"
					direction="row"					
					style={{
						backgroundColor:'#FAFAFA',
						padding:15,
						boxShadow:2
					}}>
					
					<Grid item>
						<Typography 
							variant="h6" 
							color="inherit"
							gutterBottom>
							Upload shape file
						</Typography>						
					</Grid>

				</Grid>

				<Grid
					container
					wrap="nowrap"
					justify="center"
					alignItems="center"
					style={{ 
						padding:20,						
					}}>
						
						<Grid 
							item>

							<form 
								noValidate 
								autoComplete="off">
								
								<input 
									id="raised-button-file"
									style={{ display: 'none' }}
									type="file"
									name="shape" 
									accept="shape/*.shp"
									onChange={this.handleUpload} />

								<label htmlFor="raised-button-file">
									<Button 
										variant="text"
										component="span"
										color="inherit">
										<CloudUploadIcon style={{ paddingRight:5 }}/>
										Pilih File Shape
									</Button>
								</label>
							</form>
						</Grid>
				</Grid>


			</Grid> 
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isLoading: makeSelectLoading(),
	errorMessage: makeSelectErrorMessage(),
	isShapeFileUploaded: makeSelectIsShapeFileUploaded()
});

function mapDispatchToProps(dispatch){
	return {
		uploadShape: shapefile => dispatch(uploadShapeAction(shapefile))
	}
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({ key: 'uploadShape', reducer });
const withSaga = injectSaga({ key: 'uploadShape', saga });

export default compose(withConnect)(UploadShapePage);