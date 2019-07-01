import React from 'react';
import MapRevised from '../MapRevised';
// import MapContainer from '../Map';

class DashboardOverviewPage extends React.Component {
		componentDidMount(){
			// console.log('DashboardOverviewPage',this.props.history);
		}
		render(){
			const { history } = this.props;
			return (
				<div>
					<MapRevised 
						history = { history } />
				</div>
			);			
		}
}

export default DashboardOverviewPage;