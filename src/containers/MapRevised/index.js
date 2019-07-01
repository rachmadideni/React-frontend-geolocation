import React, { Component, Fragment } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVuaXJhY2htYWRpIiwiYSI6ImNqdXptYTVoMzFhZWs0ZnMwbmI3dG00eWgifQ.tkFYtFMZwzujEkvtz9_Oiw'

class MapRevised extends Component {
	componentDidMount(){
		const map = new mapboxgl.Map({
			container:this.mapContainer,
			style:'mapbox://styles/mapbox/streets-v11?optimize=true',
			center: [119.494885,-4.851693],
      zoom: 12.5
		});
		// console.log(this.map);
		map.on('mousemove', e=>{
			const features = map.queryRenderedFeatures(e.point);
			// console.log(e);
		});		
	}

	componentWillUnmount(){
		this.mapContainer.remove();
	}
	render(){
		return (
			<div 
				ref={el=>this.mapContainer=el}
				style={{
					position:'absolute',
					top:0,
					bottom:0,
					width:'100%'
				}}>
				
			</div>
		);
	}
}
export default MapRevised;