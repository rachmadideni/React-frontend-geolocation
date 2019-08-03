import React from 'react';
import Grid from '@material-ui/core/Grid';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
 makeSelectMapStyle,
 makeSelectLayerVisibility } from '../../../Map/selectors';
import { 
	changeMapStyleAction,
	changeLayerVisibilityAction 
} from '../../../Map/action';

class PengaturanMap extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			checkedKecamatan:this.props.layerVisibility.kecamatan,
			checkedSungai:this.props.layerVisibility.sungai,
			checkedProject:this.props.layerVisibility.project
		}
		this.handleMapStyle = this.handleMapStyle.bind(this);
		this.handleLayerVisibility = this.handleLayerVisibility.bind(this); 
	}

	/*shouldComponentUpdate(nextProps,nextState){
		if(this.props.mapStyle === nextProps.mapStyle){
			return false;
			console.log('not render')
		}else{
			return true;
			console.log('is render')
		}
	}*/

	componentDidUpdate(prevProps){
		// console.log('prevProps:',prevProps);
		/*if(this.state !== prevProps.layerVisibility){
			this.setState({
				checkedKecamatan:prevProps.layerVisibility.kecamatan,
				checkedSungai:prevProps.layerVisibility.sungai,
				checkedProject:prevProps.layerVisibility.project
			})
		}*/
	}

	handleMapStyle(event,value){
		return this.props.changeMapStyle(value);
	}

	handleLayerVisibility = () => {
		const {
			checkedKecamatan,
			checkedSungai,
			checkedProject
		} = this.state;

		return this.props.changeLayerVisibility({ 
			kecamatan:checkedKecamatan, 
			sungai:checkedSungai, 
			project:checkedProject
		});
	}

	handleCheckedLayer = (event,name) => {
		this.setState({
			[name]:event.target.checked
		})
	}

	render(){
		// console.log(this.props.layerVisibility);
		const {
			checkedKecamatan,
			checkedSungai,
			checkedProject
		} = this.state;
		return (
				<Grid 
					item 
					xs
					style={{ 
						width:'95%',
						overflowX:'none',
						 }}>
							<Grid 
								item 
								style={{
									marginTop:0,
									marginBottom:0,
								}}>																	
							</Grid>						

							<Grid 
								item xs 
								style={{ marginTop:20 }}>										
									<RadioGroup
										value={this.props.mapStyle}
										onChange={this.handleMapStyle}>
											<FormControlLabel value="mapbox://styles/mapbox/streets-v11?optimize=true" label="Street" control={<Radio />} labelPlacement="end" /> 
											<FormControlLabel value="mapbox://styles/mapbox/light-v10?optimize=true" label="Light" control={<Radio />} labelPlacement="end" /> 
											<FormControlLabel value="mapbox://styles/mapbox/satellite-v9?optimize=true" label="Satelit" control={<Radio />} labelPlacement="end" /> 
											<FormControlLabel value="mapbox://styles/mapbox/dark-v10?optimize=true" label="Gelap" control={<Radio />} labelPlacement="end" /> 
									</RadioGroup>														
							</Grid>
							<Divider/>
							{/*<Grid 
								item
								style={{ 
									width:'100%',
									marginTop:20
								}}>
								<FormLabel 
									component="legend">
									Show/Hide Layer
								</FormLabel>
								
								<FormGroup row>
									<FormControlLabel 
										control={
											<Switch 
												checked={checkedKecamatan} 
												onChange={event=>this.handleCheckedLayer(event,'checkedKecamatan')} 
												value="checkedKecamatan" />
										}
										label="Kecamatan"/>
									<FormControlLabel 
										control={
											<Switch 
												checked={checkedSungai} 
												onChange={event=>this.handleCheckedLayer(event,'checkedSungai')} 
												value="checkedSungai" />
										}
										label="Sungai"/>
									<FormControlLabel 
										control={
											<Switch 
												checked={checkedProject} 
												onChange={event=>this.handleCheckedLayer(event,'checkedProject')} 
												value="checkedProject" />
										}
										label="Project"/>
										<Button 
											variant="contained" 											
											color="secondary"
											onClick={this.handleLayerVisibility}>
											Apply
										</Button>
								</FormGroup>
																
							</Grid>*/}
					</Grid>
		)
	}
}

function mapDispatchToProps(dispatch){
	return {
		changeMapStyle: (value) => dispatch(changeMapStyleAction(value)),
		changeLayerVisibility: ({kecamatan,sungai,project})=> dispatch(changeLayerVisibilityAction({kecamatan,sungai,project}))
	}
}

const mapStateToProps = createStructuredSelector({	
	mapStyle: makeSelectMapStyle(),
	layerVisibility: makeSelectLayerVisibility()
});

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(PengaturanMap);