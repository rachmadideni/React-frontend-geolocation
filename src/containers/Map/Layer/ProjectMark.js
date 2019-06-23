import React, { Component, Fragment } from 'react';
import Draw from '@urbica/react-map-gl-draw';
import { 
	Source, 
	Layer,
	Marker
} from '@urbica/react-map-gl';

import { parseProjectData } from '../helpers';

// Pin Component
import MarkerPin from '../../../icons/marker';
// Form Component
import FormProject from '../FormLayer/FormProject';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLayerVisibility } from '../selectors';

class ProjectMark extends Component {
	constructor(props){
		super(props);
		this.state = {
			project:this.props.data,
			featureId:null,
			features:[],
			data:{
			  type: 'Feature',
			  geometry: {
			    type: 'MultiPoint',
			    coordinates:[
			    	[119.521492,-4.819878],
			    	[119.506729,-4.834418],
			    	[119.560806,-4.859217]
			    ]		    
			  }
			}
		};
	}

	_onProjectUpdated = collection => {
		this.setState((state,props)=>{
			return{
				project:collection
			}
		})
	}

	_getProjectAttributes = data => {
		console.log(data);
		if(data.features.length > 0){
			const currentProperties = data.features[0].properties;
			const featureId = data.features[0].id;
			const features = data.features;
			if(currentProperties.hasOwnProperty('nampro')){
				this.setState(state=>{
					return {
						featureId,
						features
					}
				})
			}else{
				this.setState(state=>{
					return {
						featureId,
						features
					}
				})
			}
		}else{
			this.setState(state=>{
					return {
						featureId:null
					}
				})
		}
	}

	render(){
		const { 
			data,
			project,
			featureId,
			features } = this.state;

		const {
			layerVisibility
		} = this.props

		return (
			<Fragment>
				
				<Draw 
					data = { project }
					onChange={ collection => this._onProjectUpdated(collection) }
					onDrawSelectionChange={ data => this._getProjectAttributes(data) } />
					{
						!layerVisibility.sungai && 
						<FormProject 
							featureId = { featureId }
							features = { features } />
					}	
				
				{/*<Source 
					id="project" 
					type="geojson"
					data={data} />

				<Layer 
					id="marker" 
					type="circle" 
					source="project"
					paint={{
						'circle-radius': 6,
    				'circle-color': '#6bd675'
					}}
					onClick={event=>console.log(event)}>
				</Layer>*/}
					
			</Fragment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	layerVisibility:makeSelectLayerVisibility()	
})

/*function mapDispatchToProps(dispatch){
	return {
		hapusSungai:value=>dispatch(hapusSungaiAction(value))
	}
}*/

const withConnect = connect(
	mapStateToProps,
	null
);

export default compose(withConnect)(ProjectMark);