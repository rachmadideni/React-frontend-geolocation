import React, { Fragment } from 'react'
// import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom'

import DrawRiverPage from './DrawRiverPage'
import DrawProjectPage from './DrawProjectPage' // disable sementara
// import DrawProjectPage from './ProjectPage';
import DrawRiverShapePage from './DrawRiverShapePage'
import DownloadPage from '../DownloadPage'
import UploadShapePage from '../UploadShapePage'

/*import MapGL, { 
	NavigationControl, 
	FullscreenControl	
} from '@urbica/react-map-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
// import { changeMapModeAction } from './action';
import injectReducer from '../../utils/injectReducer';

import { 
	changeTabValueAction,
	changeViewportAction,
	// getGeojonAction,
	putMarkerSuccessAction,
	clearMarkerSuccessAction,
	changeDasModeAction,
	getRiverAction,
	getProjectAction
} from './action';

import { 
	makeSelectTabValue, 
	makeSelectMapConfig,
	makeSelectMapViewport,
	//makeSelectGeojson,
	makeSelectMarker,
	makeSelectMapStyle,
	makeSelectLayerVisibility,
	makeSelectDASMode,
	makeSelectRiverFeatures,
	makeSelectRiverData,
	makeSelectProjectData,
	makeSelectLoading
} from './selectors';

import ProjectMark from './Layer/ProjectMark';
import RiverMap from './Layer/RiverMap';
import LoadingDialog from '../../components/LoadingDialog';*/

// import { SUNGAI } from './constants';
// import BatasKecamatan from './Layer/BatasKecamatan';
// import Sungai from './Layer/Sungai';

// Components
// import DashboardTab from './DashboardTab';
// import SectionContainer from './SectionContainer';

class MapContainer extends React.Component {
  /*componentDidMount(){
			this.props.getRiver();
			this.props.getProject();			    					
		}
		
		handleViewportChange = (viewport) => {
			const { 
				latitude, 
				longitude, 
				zoom } = viewport;

			this.props.changeViewport({
				latitude,
				longitude,
				zoom
			});
		}	

		renderNavigationControl = () => {
			return (
				<Fragment>
					<NavigationControl showZoom position='bottom-right' />
					<FullscreenControl position='bottom-right' />
				</Fragment>
			);
		}

		_renderDrawControlType = (e) => {		
			const {
				layerVisibility
			} = this.props

			if(e){
				if (e.type === "load") {
						// this._callDrawProject();		
				}			
			}
		}

		_callDrawProject = () => {
			
			const { 
				layerVisibility,
				geodataProject, // data project
				geodata // data sungai
			} = this.props;

			if (layerVisibility.project) {
				return (
					<ProjectMark 
						data = { geodataProject } 
						riverData = { this.props.geodata } />
				);			
			}else if (layerVisibility.sungai){
				return (
					<RiverMap 
						data = { this.props.geodata } 
						fetchRiver = { this.props.getRiver } />
				);
			}
		}*/

  render() {
    /*const { 
			mapConfig,
			viewport,
			mapStyle,
			layerVisibility,
			geodata,
			geodataProject,
			isLoading
			// DASMode,
			// tabValue,
		} = this.props;*/

    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/draw/riverAtribut"
            render={(routeProps) => <DrawRiverPage {...routeProps} />}
          />

          <Route
            exact
            path="/draw/riverShape"
            render={(routeProps) => <DrawRiverShapePage {...routeProps} />}
          />

          <Route
            exact
            path="/draw/project"
            render={(routeProps) => <DrawProjectPage {...routeProps} />}
          />

          <Route
            exact
            path="/download"
            render={(routeProps) => <DownloadPage {...routeProps} />}
          />

          <Route
            exact
            path="/upload/shape"
            render={(routeProps) => <UploadShapePage {...routeProps} />}
          />
        </Switch>
        {/*<LoadingDialog 
					isLoading={isLoading} />*/}

        {/*<MapGL
					ref = { (myMap) => { this.myMap = myMap; } } 					
					accessToken = { mapConfig.token } 
					latitude = { viewport.latitude } 
					longitude = { viewport.longitude } 
					zoom = { viewport.zoom }
					mapStyle={mapStyle}
					style={{ width: '100vw', height: '90vh' }}
					onViewportChange = { 
						viewport => this.handleViewportChange(viewport)
					}
					onLoad = {e=>this._renderDrawControlType(e)} >*/}

        {/*						
						layerVisibility.project && 
						<ProjectMark 
							data = { geodataProject } riverData = { this.props.geodata } />
					*/}

        {/*
						// render river hanya jika features punya isi
						// jike river visible = true dan data river ada   
						(layerVisibility.sungai && geodata.features.length > 0) &&
						<RiverMap 
							data={this.props.geodata} 
							fetchRiver={this.props.getRiver} />												
					*/}
        {/*</MapGL>*/}
      </Fragment>
    )
  }
}

/*MapContainer.propTypes = {
	mapConfig: PropTypes.object,
	viewport: PropTypes.object,
	mapStyle: PropTypes.string,
	layerVisibility: PropTypes.bool,
	geodata: PropTypes.object,
	geodataProject: PropTypes.object,
	isLoading: PropTypes.bool,
	handleViewportChange: PropTypes.func,
	renderNavigationControl: PropTypes.func, 
	_renderDrawControlType: PropTypes.func,
	_callDrawProject: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	tabValue: makeSelectTabValue(),
	mapConfig: makeSelectMapConfig(),
	viewport: makeSelectMapViewport(),
	geodata:makeSelectRiverData(),
	geodataProject:makeSelectProjectData(),
	marker: makeSelectMarker(),	
	mapStyle: makeSelectMapStyle(),
	layerVisibility: makeSelectLayerVisibility(),
	DASMode: makeSelectDASMode(),
	selectRiverFeatures: makeSelectRiverFeatures(),
	isLoading: makeSelectLoading(),
	//geoData: makeSelectGeojson(),
});

function mapDispatchToProps(dispatch){
	return {
		getRiver: () => dispatch(getRiverAction()),
		getProject: () => dispatch(getProjectAction()),
		changeTabValue: (value) => dispatch(changeTabValueAction(value)),
    changeViewport: ({ latitude, longitude, zoom }) => dispatch(changeViewportAction({ latitude, longitude, zoom })),
    putMarker: payload => dispatch(putMarkerSuccessAction(payload)),
    clearMarker: () => dispatch(clearMarkerSuccessAction()),
    changeDasMode: payload => dispatch(changeDasModeAction(payload)),
		// changeMapMode:()=>dispatch(changeMapModeAction()),
		// getGeojon: key => dispatch(getGeojonAction(key)),
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

const withReducer = injectReducer({ key: 'mapContainer', reducer });
const withSaga = injectSaga({ key: 'mapSaga', saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(MapContainer);*/
export default MapContainer
