import React from 'react';
import MapContainer from '../Map';

// import MapContainer from '../Map/olmap';
// test using mapboxgl
// import MapRaw from '../Map/mapbox-raw';
// import NewMap from '../Map/NewMap';
// class DashboardOverviewPage extends React.Component{

function DashboardOverviewPage(){
		return (
			<div>
				<MapContainer />
			</div>
		);
}

export default DashboardOverviewPage;