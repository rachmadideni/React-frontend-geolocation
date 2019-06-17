import React, { Component, Fragment } from 'react';
import Draw from '@urbica/react-map-gl-draw';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class RiverMap extends Component {
	constructor(props){
		super(props);
		this.state = {
			river:this.props.data			
		}		
	}

	render(){		
		const { river } = this.state
		return (
			<Fragment>
				<div style={{
					position:'absolute',
					top:'30px',
					left:'20px'
				}}>{JSON.stringify(river)}				
				</div>


				<Draw 
					data={river}
					onChange={e=>console.log('updated!')}
					onDrawCombine={e=>console.log('onDrawCombine',e)} />
				
				<Card 
					style={{
						width:'100vw',
						padding:0,
						position:'absolute',
						bottom:'20px',						
					}}>

					<CardActions>						
						<Button size="small" variant="contained" style={{ backgroundColor:'green',color:'white' }}>SAVE</Button>
						<Button size="small" variant="contained" color="info">CANCEL</Button>
					</CardActions>

				</Card>
				{/* onChange={e=>this.setState({ river:e })} */}
			</Fragment>
		);
	}
}

export default RiverMap;