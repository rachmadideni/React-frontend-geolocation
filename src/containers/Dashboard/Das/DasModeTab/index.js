import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectDASMode } from '../../../Map/selectors';
import { changeDasModeAction } from '../../../Map/action';

class DasModeTab extends React.Component {

	handleDASMode = (event,value) =>{		
		this.props.changeDasMode(value);
	}

	render(){
		return (
			<Grid 
				item 								
				style={{ 
					width:'94%',
					height:'100%',
					backgroundColor:'none',
					margin:20 }}>
				
				<FormControl 
					component="fieldset">
					<FormLabel
						component="legend">
						DAS Mode
					</FormLabel>
					<RadioGroup
						value={this.props.DASMode}
						onChange={this.handleDASMode}>
							<FormControlLabel value="VIEW" label="View" control={<Radio />} labelPlacement="end" /> 
							<FormControlLabel value="EDIT" label="Edit" control={<Radio />} labelPlacement="end" /> 											
					</RadioGroup>								
				</FormControl>								
			</Grid>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	DASMode: makeSelectDASMode(),
});

function mapDispatchToProps(dispatch){
	return {
		changeDasMode: value => dispatch(changeDasModeAction(value))
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(
	withConnect
)(DasModeTab);