import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
//import Slider from '@material-ui/lab/Slider';

const marks = [{ value:0,label:'0%' },{ value:25,label:'25%' },{ value:50,label:'50%' },{ value:75,label:'75%' },{ value:100,label:'100%' }];

function valuetext(value) {
  return `${value} %`;
}

class SliderProgress extends Component {
	render(){
		const { disabled } = this.props
		return (
			<Fragment>
				<Typography 
					color="secondary"
					variant="caption" 
					display="block" 
					gutterBottom>
					Progress				
				</Typography>
				<Slider 
					defaultValue={0}
					getAriaValueText={valuetext}
					valueLabelDisplay="auto"
					disabled={disabled}
					step={5} 
					min={0} 
					max={100}
					marks={marks}>
				</Slider>
			</Fragment>
		);
	}
}

export default SliderProgress;