import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import {
	Avatar,
	Grid,
	Typography,
	Card,
	CardHeader,
	CardContent,
	IconButton,
	Collapse,
} from '@material-ui/core'

import { 
	RoomSharp,
	ExpandLess,
	ExpandMore
} from '@material-ui/icons';

import { green, blue, orange } from '@material-ui/core/colors';

import MapGL, { Source, Layer, Marker, NavigationControl, FullscreenControl, MapContext, Image, FeatureState  } from '@urbica/react-map-gl';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from '../../utils/injectSaga';
import saga from 'containers/Map/saga';
import reducer from 'containers/Map/reducer';

import {
	makeSelectMapConfig,
	makeSelectMapViewport,
	makeSelectMapStyle,
	makeSelectRiverData,
	makeSelectProjectData
} from 'containers/Map/selectors';

import {
	getRiverAction,
	loadProjectAction,
	changeViewportAction
} from 'containers/Map/action';

import {
	Wrapper
} from 'components/Form';

import ToggleFormButton from './component/ToggleFormButton';
import ListItems from './component/ListItems';
import Legend from './component/Legend';
import TaludIcon from 'icons/talud';

import * as turf from '@turf/turf'

const CustomCardHeader = styled(CardHeader).attrs({
  classes: { 
  	title: 'title', 
  	subheader: 'subheader' },
})`
  .title {
    font-size:14px;
    font-weight:bold;
    color:#354577;
    padding-top:0px;
    margin-top:0px;
  }
  .subheader {
  	font-size:12px;
  }
  && {
		//padding-top:5px;
		// padding-left:10px;
		// margin:0px;
  }
`;

class MapSummary extends Component {
	constructor(props){
		super(props);
		this.state = {
			isSummaryFormOpen:false,
			hoveredStateId:null,
			judulPeta:'Ringkasan Peta Kabupaten Pangkep',
			expandProyek:false,
			expandSungai:false,
			selectedList:''
		}
	}

	onHover = event => {
		console.log('onHover event',event);
		if(event.features.length > 0){
			const hoveredStateId = event.features[0].id;
			if(hoveredStateId !== this.state.hoveredStateId){
				this.setState({
					hoveredStateId
				})
			}
		}
	}

	onLeave = () => {
	  if (this.state.hoveredStateId) {
	    this.setState({ hoveredStateId: null });
	  }
	}  

	componentDidMount(){
		this.props.getRiver();
		this.props.loadProject();
	}

	handleViewportChange = viewport => {
		const { changeViewport } = this.props;
		const { latitude, longitude, zoom } = viewport;
		return changeViewport({
			latitude,
			longitude,
			zoom
		});
	}

	toggleSummaryForm = () => {
		this.setState({
			isSummaryFormOpen:!this.state.isSummaryFormOpen
		})
	}

	toggleExpandLegend = (name) => {
		// console.log(name);
		if(name === 'proyek'){
			this.setState({
				expandProyek:!this.state.expandProyek,
				selectedList:'proyek'
			});
		}else if(name === 'sungai'){
			this.setState({
				expandSungai:!this.state.expandSungai,
				selectedList:'sungai'
			});
		}		
	}	 

	displayMarkerForProject = (feature,index) => {
		let { type, coordinates } = feature.geometry;
		let { properties } = feature;
		
		return (						
			<Marker
				key={`marker-${index}`}
				longitude={type === 'LineString' ? coordinates[0][0] : coordinates[0]}
				latitude={type === 'LineString' ? coordinates[0][1] : coordinates[1]}
				offset={[0,-20]}>
				{ properties.idMarker === 0 ? 
					<Avatar 
						style={{ 
							margin: 10,
							width:24,
							height:24,
							backgroundColor:green[500]
						}}>
							<RoomSharp 
								style={{
									color:'white',
									fontWeight:'bold',
									fontSize:24							
								}} />
						</Avatar> : 
						<Avatar style={{ 
							margin: 10,
							width:24,
							height:24,
							backgroundColor:green[500] 
						}}>
							<RoomSharp 
								style={{
									color:'white',
									fontWeight:'bold',
									fontSize:24							
								}} />
						</Avatar>
				}				
			</Marker>			
		);

	}

	extractLineFromProject = data => {
		var dt = []
		const { features } = data;		
		turf.featureEach(data, function (currentFeature, featureIndex) {		  
		  if(currentFeature.geometry.type === 'LineString'){
		  	dt.push(currentFeature);
		  }		  
		});
		return turf.featureCollection(dt);	
	}

	render(){

		const {
			classes, 
			mapConfig,
			viewport,
			mapStyle,
			riverData,
			projectData
		} = this.props;

		const { 
			features 
		} = projectData;

		
		
		return (
			<MapGL 
				{...viewport} 
				mapStyle={'mapbox://styles/mapbox/light-v10?optimize=true'}
				accessToken={mapConfig.token}
				onViewportChange = { viewport => this.handleViewportChange(viewport) }
				style = {{ 
					width: '100vw',
					height: '100%' }}>

					
					<ToggleFormButton 
						toggleForm={this.toggleSummaryForm} 
						toggleState={this.state.isSummaryFormOpen} />					
				
						<Wrapper 				
							container="true"
							direction="column"				
							style={{
								backgroundColor:'none',
								padding:0,
								margin:0					
							}}>

							<Card 								
								style={{
									boxShadow:'none',									
								}}>
								<CustomCardHeader										
									action={										
										<IconButton style={{ fontSize:12,margin:5 }}onClick={this.toggleSummaryForm}>
											{ this.state.isSummaryFormOpen ? <ExpandLess /> : <ExpandMore /> }
										</IconButton>
									}
									title={this.state.judulPeta} />
									
									<Collapse 
										in={this.state.isSummaryFormOpen} 
										timeout="auto" 
										unmountOnExit>
										
										<CardContent style={{ padding:0, marginBottom:15 }}>																						
											
											<Legend 
												name = "sungai" 
												color = "blue"
												expand = { this.state.expandSungai } 
												toggle = { this.toggleExpandLegend }
												selectedList = {this.state.selectedList}
												riverData = { this.props.riverData }
												projectData = {[]} />
											
											<Legend 
												name = "proyek" 
												color = "green" 
												expand = { this.state.expandProyek } 
												toggle = { this.toggleExpandLegend }
												selectedList = {this.state.selectedList}
												projectData = { this.props.projectData }
												riverData = {[]} />

										</CardContent>

									</Collapse>

							</Card>
						</Wrapper>
					{
						<MapContext.Consumer>
						{map => {				      
					      map.setPaintProperty('water', 'fill-color', '#0ab1db');
					      return;
					   }}
						</MapContext.Consumer>
					}

					<Source id="sungai" type="geojson" data={this.props.riverData} />
					<Source id="proyek" type="geojson" data={this.props.projectData} />
					<Source id="proyek_as_line" type="geojson" data={this.extractLineFromProject(this.props.projectData)} />

					<Layer 
						id="sungai" 
						type="line" 
						source="sungai" 
						layout={{ 
							'line-join':'round',
							'line-cap':'round' 
						}}
						paint={{
				      'line-color': blue[500],
				      'line-width': 3,
				      'line-opacity': [
				      	'case',
				      	['boolean',['feature-state','hover'],false],0.5,1
				      ]
				    }} 
				    onHover={this.onHover}
				    onLeave={this.onLeave} />

				  	{/* label nama sungai */}
				    <Layer id="nama_sungai" type="symbol" source="sungai" 
					    layout={{							
								'text-field':'{nmsung}',
								'text-size': 12,
								'text-font': ['DIN Offc Pro Medium','Arial Unicode MS Regular'],							
								'text-offset': [0, 0.6],
								'text-anchor': 'top',							
							}}
							paint={{
	                'text-color': 'hsl(0, 0%, 37%)',
	                'text-halo-color': 'hsl(0, 0%, 100%)',
	                'text-halo-width': 1
	            }} />

	           {/* label nama proyek */}
	           <Layer 
								id="nama_proyek"
								type="symbol"
								source="proyek"
								layout={{							
									'text-field':'{nampro}',
									'text-size': 11,
									'text-font': ['DIN Offc Pro Medium','Arial Unicode MS Regular'],							
									'text-offset': [0, 1.4],
									'text-anchor': 'bottom',							
								}}
								paint={{
		                'text-color': 'hsl(0, 0%, 37%)',
		                'text-halo-color': 'hsl(0, 0%, 100%)',
		                'text-halo-width': 1
		            }} />

							{/* titik proyek */}
							<Layer 
								id="proyek" 
								type="circle" 
								source="proyek" 								
								paint={{ 
									'circle-radius':3, 
									'circle-color':'green'
								}} />

							<Layer 
								id="proyek_line" 
								type="line" 
								source="proyek_as_line" 								
								paint={{ 
									'line-color': green[500],
				      		'line-width': 3,
								}} />

					{features.map(this.displayMarkerForProject)}

					{
						this.state.hoveredStateId && (
							<FeatureState id={this.state.hoveredStateId} source="sungai" state={{ hover: true }} />
						)
					}


				<FullscreenControl position="top-right" onClick={e=>console.log(e)} />
				<NavigationControl showCompass showZoom position='top-right' />
			</MapGL>
		);

	}
}

const mapStateToProps = createStructuredSelector({		
	mapConfig: makeSelectMapConfig(),
	viewport: makeSelectMapViewport(),
	mapStyle: makeSelectMapStyle(),
	riverData: makeSelectRiverData(),
	projectData:makeSelectProjectData(),	
});

function mapDispatchToProps(dispatch){
	return {
		getRiver: () => dispatch(getRiverAction()),
		loadProject: () => dispatch(loadProjectAction()),
		changeViewport: ({ latitude, longitude, zoom }) => dispatch(changeViewportAction({ latitude, longitude, zoom })),
	}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'mapSummary', saga });

export default compose(withSaga, withConnect)(withStyles()(MapSummary));