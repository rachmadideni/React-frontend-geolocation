import React from 'react'
// test provider alternative selain @urbica/react-map-gl
import ReactMapboxGl, { Source, Layer } from 'react-mapbox-gl'
import Draw from '@urbica/react-map-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import LoadingDialog from '../../components/LoadingDialog'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import injectSaga from '../../utils/injectSaga'
import saga from './saga'

import { getRiverAction } from './action'
import {
  makeSelectLoading,
  makeSelectMapConfig,
  makeSelectRiverData,
  makeSelectMapStyle,
  makeSelectMapViewport,
} from './selectors'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
})

class DrawProjectPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getRiver()
  }

  render() {
    const { isLoading, mapStyle, mapConfig, viewport, riverData } = this.props

    return (
      <React.Fragment>
        <LoadingDialog isLoading={isLoading} />
        <Map
          style={mapStyle}
          center={[viewport.longitude, viewport.latitude]}
          zoom={[viewport.zoom]}
          containerStyle={{
            flex: 1,
            height: '100%',
          }}
        >
          {/*<Source 
						id="sungai"
						geoJsonSource={riverData} />*/}

          <Layer
            type="line"
            layout={{
              'line-cap': 'round',
              'line-join': 'round',
            }}
            paint={{
              'line-color': '#4790E5',
              'line-width': 12,
            }}
          />
        </Map>
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  mapConfig: makeSelectMapConfig(),
  mapStyle: makeSelectMapStyle(),
  riverData: makeSelectRiverData(),
  viewport: makeSelectMapViewport(),
  //projectData:makeSelectProjectData(),
})

function mapDispatchToProps(dispatch) {
  return {
    getRiver: () => dispatch(getRiverAction()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withSaga = injectSaga({ key: 'mapProjectSaga', saga })

export default compose(withSaga, withConnect)(DrawProjectPage)
