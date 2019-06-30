import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
import { 
	makeSelectLayerVisibility,
	makeSelectFormRiverData } from '../selectors';

class ProjectMark extends Component {
	constructor(props){
		super(props);
		this.state = {
			project:this.props.data,
			featureId:null,
			features:[]		
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
		console.log('_getProjectAttributes:',data);
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
			features 
		} = this.state;

		const {
			layerVisibility
		} = this.props

		return (
			<Fragment>
								
						<Source 
							id="river" 
							type="geojson"
							data = { this.props.riverData } />

						<Layer 
							id="river" 
							type="line" 
							source="river"
							paint={{
					      'line-color': '#3bb2d0',
					      'line-width': 3
					    }}
							onClick={event=>console.log(event)}>
						</Layer>

						{	this.props.layerVisibility.project &&	

							<React.Fragment>
								<FormProject 
									featureId = { featureId }
									features = { features } />
								<Draw 
									data = { project }
									onChange = { 
										collection => this._onProjectUpdated(collection)										
									}
									onDrawSelectionChange = { 
										data => this._getProjectAttributes(data) 
									}
									 />
							</React.Fragment>
						}
						{/*paint={{
								'circle-radius': 6,
		    				'circle-color': '#6bd675'
							}}*/}
					
			</Fragment>
				
		);
	}
}

ProjectMark.propTypes = {
	// semua data dari parent comp
	data:PropTypes.object,
	riverData:PropTypes.object,
	layerVisibility:PropTypes.object
}

const mapStateToProps = createStructuredSelector({
	layerVisibility:makeSelectLayerVisibility(),
	// riverData:makeSelectFormRiverData()
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