import React from 'react';
import { 
	Source, 
	Layer,
	Popup,
} from '@urbica/react-map-gl';

import { BATAS_KECAMATAN } from '../constants';
// import { colorToRGBArray } from '../helpers';

class BatasKecamatan extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			open:false,
			latitude:0,
			longitude:0,
			nama_kec:''
		}
		this.handleClickBoundary = this.handleClickBoundary.bind(this);		
	}

	componentDidMount(){
		console.log('BK:',this.props);
	}

	handleClickBoundary(event){
		// console.log(event.features[0].properties.nama_kec);
		// console.log(event.lngLat.lat);
		if(event.features.length > 0){
			const nama_kec = event.features[0].properties.nama_kec;
			this.setState({
				latitude:event.lngLat.lat,
				longitude:event.lngLat.lng,
				nama_kec
			});
		}
	}

	displayDialog(){
		const {
		    longitude,
		    latitude,
		    nama_kec
		} = this.state;
		return (
			<Popup 
				longitude={longitude}
				latitude={latitude}
				closeButton={false} closeOnClick={false}>
				<h4>{nama_kec}</h4>
			</Popup>
		);
	}

	render(){
		// const { 
		// 	open,
		// 	latitude,
		// 	longitude } = this.state;
		return (
			<React.Fragment>
				<Source 
					id="batas_kecamatan" 
					type="geojson" 
					data = { BATAS_KECAMATAN } />
				
				<Layer 
					id="fill_kecamatan" 
					type="fill" 
					source="batas_kecamatan" 
					paint={{
						'fill-color':{
							type:'identity',
							property:'color'
						},
					  'fill-opacity': 0.2,
					  'fill-outline-color': 'red'
					}} 
					onHover = { event => this.handleClickBoundary(event) } />
					
					{/*this.displayDialog()*/}

			</React.Fragment>
		);
	}
}

export default BatasKecamatan;