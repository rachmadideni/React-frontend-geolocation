import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Source, Layer, FeatureState } from '@urbica/react-map-gl'
import Draw from '@urbica/react-map-gl-draw'
import Snackbar from '@material-ui/core/Snackbar'

import * as turf from '@turf/turf'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { changeDrawerStateAction } from '../action'

// ACTION: DASHBOARD.
// BUKA/TUTUP DRAWER, SWITCH TAB DAS
// newRiver action Simpan state NEW/EDIT utk switching form ke mode tambah atau mode update sungai

import {
  changeMainDrawerTabValueAction,
  changeDasInnerTabValueAction,
  newRiverAction,
} from '../../Dashboard/action'

// ACTION: MAP
/*
	{
    addRiverAction:
    setRiverPropAction: menambah features ke state mapContainer>features
    getRiverAttributeAction:
    getRiverAction
	}
*/
import {
  // addRiverAction,
  setRiverPropAction,
  getRiverAttributeAction,
  getRiverAction,
  getRiverFailedAction,
  setSnackbarAction,
} from '../action'

import {
  makeSelectDrawerState,
  makeSelectRiverFeatures,
  makeSelectRiverData,
  makeSelectLoading,
  makeSelectErrorMessage,
  makeSelectSnackBarState,
} from '../selectors'

import saga from '../saga'
import injectSaga from '../../../utils/injectSaga'

import { DialogBox, IconInfoWrap, InfoMode } from './Components'
import LoadingDialog from '../../../components/LoadingDialog'

class Sungai extends React.Component {
  constructor(props) {
    super(props)
    this.dialogBox = React.createRef()

    this.state = {
      hoveredSungaiId: null,
      properti: {},
      mode: 'simple_select',
      features: [],
      geojsonRiver: {
        type: 'FeatureCollection',
        features: [],
      },
      test: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [119.50269559, -4.82774609],
                [119.50541266, -4.82764186],
                [119.50661429, -4.82918133],
              ],
            },
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [119.50399875640868, -4.831381442892667],
                [119.50889110565186, -4.83142420575213],
              ],
            },
          },
        ],
      },
    }

    this.dispDialog = this.dispDialog.bind(this)
    this.drawControl = {}
  }

  componentDidMount() {
    // fetch initial river state API Call through saga
    this.props.getRiver()
    // console.log('river data from api:',this.props.riverData)
    this.setState((prevState, props) => {
      // console.log('f2:',prevState.coba.features)
      // let newState = [].concat(prevState.coba.features,this.props.dt)
      // console.log('ps',prevState);
      // console.log('ns',props.SelectRiverFeatures);
      /*return {

    		}*/
    })
  }

  componentDidUpdate(prevProps, prevState, nextState) {
    // console.log('river data from api:',this.props.riverData)
    // this.props.getRiver();
    console.log('mode state:', this.state.mode)
    // console.log(this.props);

    // console.log('prevProps:',prevProps);// props
    // console.log('prevState:',prevState.geojsonRiver);// state
    // console.log('nextState:',this.state.geojsonRiver)

    // console.log(prevProps.geodata.river);
    // console.log(this.props.riverData);
    // if(prevProps.geodata.river !== this.props.riverData){

    // console.log(_.isEqual(prevProps.geodata.river,this.props.riverData))
    // console.log(turf.booleanEqual(prevProps.geodata.river, this.state.geojsonRiver));
    if (_.isEqual(prevProps.geodata, this.props.riverData)) {
      console.log(true)
      console.log(this.state.geojsonRiver)
      // if(_.isEqual(prevProps.riverData,prevState.geojsonRiver)){
      // console.log('statefromProps is equal with state');
    } else {
      console.log(false)
      console.log('statefromProps is Not equal with state')
      this.setState({
        geojsonRiver: this.props.riverData,
      })
    }

    // console.log('river data from api (updated):',JSON.stringify(this.props.riverData))
  }

  handleRiverOnHover = (event) => {
    //console.log(event.features[0].geometry.coordinates)
    const kordinat = event.features[0].geometry.coordinates
    const properti = event.features[0].properties
    var garis_sungai = turf.lineString(kordinat)
    var panjang_sungai = turf.length(garis_sungai, { units: 'kilometers' })
    var panjang_sungai2 = Math.round(panjang_sungai * 100) / 100

    const hoveredSungaiId = event.features[0].properties.idsung
    if (hoveredSungaiId !== this.state.hoveredSungaiId) {
      this.setState((prevState) => {
        return {
          hoveredSungaiId,
          ...properti,
          properti: { ...properti },
          panjang_sungai: panjang_sungai2,
        }
      })
    }
  }

  RiverOnLeave = () => {
    if (this.state.hoveredSungaiId) {
      // this.setState({ hoveredSungaiId: null });
    }
  }

  dispDialog() {
    const { properti, hoveredSungaiId, panjang_sungai } = this.state

    if (hoveredSungaiId) {
      return (
        <DialogBox ref={this.dialogBox}>
          <span>{properti.nmsung}</span>
          <br />
          <span>{`${panjang_sungai} km`}</span>
        </DialogBox>
      )
    }
  }

  // ADD RIVER

  updateRiver = (event) => {
    console.log(event)
    this.props.changeDrawerState(!this.props.drawerState) // buka drawer
    this.props.changeMainDrawerTabValue(1) // pindah ke Tab DAS
    this.props.changeDasInnerTabValue(1) // pindah ke Tab Sungai
    if (this.state.mode === 'draw_line_string') {
    }

    if (event.features.length > 0) {
      // kita cek jika yg dibuat adalah sungai baru berdasarkan properti nmsung
      if (!event.features[0].properties.hasOwnProperty('nmsung')) {
        // simpan data features ke store/state ( mapContainer > features [] )
        this.props.newRiver('NEW') // load form atribut sungai
        this.props.setRiverProp(event.features)
      } else {
        this.props.newRiver('UPDATE')
      }
    }
  }

  addNewRiver = (evt) => {
    console.log('addNewRiver')
    let { mode } = this.state
    let { drawerState } = this.props

    if (mode === 'draw_line_string') {
      this.props.changeDrawerState(!drawerState)
      this.props.changeMainDrawerTabValue(1)
      this.props.changeDasInnerTabValue(1)
      this.props.newRiver('NEW')
    }
  }

  onSelectedRiver = (evt) => {
    let { mode } = this.state
    let { drawerState } = this.props

    if (mode === 'simple_select') {
      console.log('onSelectedRiver:', evt)
      // hanya lanjut jika features ada data
      if (evt.features.length > 0) {
        // this.props.getRiverAttribute(evt.features[0].id)
        // cek jika properties ada nilai
        let prop = evt.features[0].properties
        let features = evt.features

        if (prop.hasOwnProperty('nmsung')) {
          // user is editing
          this.props.changeDrawerState(!drawerState)
          this.props.changeDasInnerTabValue(1)
          this.props.changeMainDrawerTabValue(1)
          this.props.newRiver('UPDATE')
        } else {
          // alert('new')
          this.props.changeDrawerState(!drawerState)
          this.props.changeMainDrawerTabValue(1)
          this.props.changeDasInnerTabValue(1)
          this.props.newRiver('NEW')
          // this.props.addRiver();// disable. will move to form action api calls

          // simpan features ke state hanya jika kosong
          if (this.props.SelectRiverFeatures.length < 1) {
            this.props.setRiverProp(features) // masukkan ke state features
            // console.log()
          }
        }
      }
    }
  }

  render() {
    const {
      data,
      DASMode,
      isLoading,
      errorMessage,
      getRiverFailed,
      snackBarState,
      setSnackbar,
    } = this.props
    // console.log('initial features:',dt);

    if (DASMode === 'VIEW') {
      this.drawControl = {
        lineStringControl: false,
        polygonControl: false,
        combineFeaturesControl: false,
        pointControl: false,
        trashControl: false,
        uncombineFeaturesControl: false,
        userProperties: true,
        clickBuffer: 6,
      }
    } else {
      this.drawControl = {
        lineStringControl: true,
        pointControl: true,
        polygonControl: true,
        combineFeaturesControl: true,
        trashControl: true,
        uncombineFeaturesControl: false,
        userProperties: true,
        clickBuffer: 6,
      }
    }

    return (
      <Fragment>
        <LoadingDialog isLoading={isLoading} />
        <Snackbar
          variant="error"
          open={snackBarState}
          autoHideDuration={10000}
          message={errorMessage}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          style={{
            paddingTop: 0,
            paddingBottom: 50,
            bacgroundColor: 'tomato',
          }}
          onClose={() => {
            getRiverFailed(null)
            setSnackbar(false)
          }}
        />
        {DASMode === 'VIEW' && (
          <Fragment>
            <InfoMode>
              <IconInfoWrap fontSize="small" />
              <span>View mode</span>
            </InfoMode>

            <Source id="sungai" type="geojson" data={data} />

            <Layer
              id="sungai"
              before="marker"
              type="line"
              source="sungai"
              paint={{
                'line-color': '#3BB2D0',
                //'line-width': 3,
                'line-width': [
                  'case',
                  ['boolean', ['feature-state', 'hover'], false],
                  2,
                  1,
                ],
              }}
              radius={12}
              onHover={(event) => this.handleRiverOnHover(event)}
              onLeave={this.RiverOnLeave}
            />
            {this.dispDialog()}

            {this.state.hoveredSungaiId && (
              <FeatureState
                id={this.state.hoveredSungaiId}
                source="sungai"
                state={{ hover: true }}
              />
            )}
          </Fragment>
        )}

        {DASMode === 'EDIT' && (
          <Fragment>
            <InfoMode>
              <IconInfoWrap />
              <span>Edit mode</span>
              {JSON.stringify(this.state.geojsonRiver, null, 2)}
              {/*JSON.stringify(this.props.riverData)*/}
            </InfoMode>
            <Draw
              {...this.drawControl}
              data={this.state.geojsonRiver}
              onChange={(e) => this.setState({ geojsonRiver: e })}
              onDrawCreate={(e) => console.log('onDrawCreate', e)}
              onDrawModeChange={({ mode }) => this.setState({ mode })}
              onDrawCombine={(e) => console.log('onDrawCombine', e)}
              onDrawUpdate={(e) => console.log('onDrawUpdate:', e)}
            />

            {/*
			    				data = { this.state.geojsonRiver }					    	
			    				onDrawSelectionChange = { e => this.onSelectedRiver(e) }
			    				onChange = { ({ data }) => this.setState({ geojsonRiver: data }) }
			    				onChange = { e => console.log('onChange:', e) } 
			    				onChange = { (data) => this.setState({ geojsonRiver: data }) }
			    				onChange = { (data) => this.setState({ test: data }) }
									onDrawModeChange={({ mode }) => this.setState({ mode })}
					    	onDrawCreate = { e =>this.addNewRiver(e) } 
					    	onDrawSelectionChange = { e => this.onSelectedRiver(e) }

			    				onDrawUpdate = { e => console.log('onDrawUpdate:', e) }
			    				onChange = { e => console.log('onChange:', e) } 
			    				onDrawCreate = { e =>this.addNewRiver(e) } 
					    		onDrawSelectionChange = { e => this.onSelectedRiver(e) }
			    				onDrawActionable={e=>console.log('onDrawActionable:',e)} 
			    			*/}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

Sungai.propTypes = {
  drawerState: PropTypes.bool,
  SelectRiverFeatures: PropTypes.array,
  riverData: PropTypes.object,
  changeDrawerState: PropTypes.func,
  changeMainDrawerTabValue: PropTypes.func,
  changeDasInnerTabValue: PropTypes.func,
  newRiver: PropTypes.func,
  // addRiver:PropTypes.func,
  setRiverProp: PropTypes.func,
  getRiverAttribute: PropTypes.func,
  getRiver: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  drawerState: makeSelectDrawerState(),
  SelectRiverFeatures: makeSelectRiverFeatures(),
  riverData: makeSelectRiverData(),
  isLoading: makeSelectLoading(),
  errorMessage: makeSelectErrorMessage(),
  snackBarState: makeSelectSnackBarState(),
})

function mapDispatchToProps(dispatch) {
  return {
    changeDrawerState: (value) => dispatch(changeDrawerStateAction(value)),
    changeMainDrawerTabValue: (value) =>
      dispatch(changeMainDrawerTabValueAction(value)),
    changeDasInnerTabValue: (value) =>
      dispatch(changeDasInnerTabValueAction(value)),
    newRiver: (value) => dispatch(newRiverAction(value)),
    // addRiver: () => dispatch(addRiverAction()),
    setRiverProp: (value) => dispatch(setRiverPropAction(value)),
    getRiverAttribute: (value) => dispatch(getRiverAttributeAction(value)),
    getRiver: () => dispatch(getRiverAction()),
    getRiverFailed: (value) => dispatch(getRiverFailedAction(value)),
    setSnackbar: (value) => dispatch(setSnackbarAction(value)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withSaga = injectSaga({ key: 'river', saga })

export default compose(withSaga, withConnect)(Sungai)
