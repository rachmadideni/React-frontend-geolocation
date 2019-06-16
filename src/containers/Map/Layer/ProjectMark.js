import React from 'react';
import { 
	Source, 
	Layer,
	Marker
} from '@urbica/react-map-gl';

import { parseProjectData } from '../helpers';

class ProjectMark extends React.Component{
	constructor(props){
		super(props);
		this.state = {						
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
	render(){
		const { data } = this.state;
		return (
			<React.Fragment>
				
				<Source 
					id="project" 
					type="geojson"
					data={data} />

				<Layer 
					id="marker" 
					type="circle" 
					source="project"
					paint={{
						'circle-radius': 6,
    				'circle-color': '#1978c8'
					}}
					onClick={event=>console.log(event)} />
					
			</React.Fragment>
		);
	}
}

export default ProjectMark;