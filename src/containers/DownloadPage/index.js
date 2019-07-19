import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
	downloadExportAction
} from '../Map/action';

import { makeSelectLoading } from '../Map/selectors';

import saga from '../Map/saga';
import injectSaga from '../../utils/injectSaga';

import LoadingDialog from '../../components/LoadingDialog';


class DownloadPage extends React.Component {
	
	_onClickExport = () => {
		let filename = 'exportData';
		return this.props.downloadExport(filename);
	}

	render(){
		const { isLoading } = this.props
		return (
			<Grid
				container
				wrap="nowrap"
				direction="column" 
				style={{ 
					width:'40%',
					height:'100%',
					padding:20 
				}}>

				<LoadingDialog isLoading={isLoading} />
					
				<Grid item>
					<Typography 
						variant="h6" 
						color="inherit" 
						style={{ 
							flexGrow: 1,
							fontSize:18,
							paddingLeft:10 
						}}>
							{'Download Data Sungai dan Proyek'}
					</Typography>
					<Typography 
						variant="subtitle1">
						{`Tombol Download digunakan untuk mengambil data sungai & proyek yang telah dibuat. 
							Selanjutnya Data ini diupload ulang di website Dinas PU Kabupaten Pangkep`}
					</Typography>
				</Grid>

				<Grid item>				
					<Button 
						variant="contained"
						color="primary"
						fullWidth
						onClick={this._onClickExport}
						style={{ marginTop:10}}>
							Download
						</Button>
				</Grid>				

			</Grid>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isLoading: makeSelectLoading()
});

function mapDispatchToProps(dispatch){
	return {
		downloadExport: (filename) => dispatch(downloadExportAction(filename))
	}
}

const withSaga = injectSaga({ key: 'downloadSaga', saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withSaga)(DownloadPage);