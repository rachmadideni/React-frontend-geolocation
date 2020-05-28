import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Draw from '@urbica/react-map-gl-draw'
import {
  Source,
  Layer,
  // Marker
} from '@urbica/react-map-gl'

// import { parseProjectData } from '../helpers';

// Pin Component
// import MarkerPin from '../../../icons/marker';
// Form Component
import FormProject from '../FormLayer/FormProject'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectLayerVisibility,
  // makeSelectFormRiverData,
  makeSelectDrawMode,
} from '../selectors'

import { changeDrawModeAction } from '../action'

class ProjectMark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: this.props.data,
      river: this.props.riverData,
      featureId: null,
      features: [],
    }
  }

  componentDidMount() {
    // console.log(this.drawControl);
  }

  _onProjectUpdated = (collection) => {
    // console.log('collection = ',collection)
    this.setState((state, props) => {
      return {
        project: collection,
      }
    })
  }

  _getProjectAttributes = (data) => {
    // console.log('_getProjectAttributes:',data);
    // var data = this.drawControl._draw.getAll();
    console.log('Draw getAll : ', this.drawControl)
    // console.log('state project : ',  this.state.project);
    if (data.features.length > 0) {
      const currentProperties = data.features[0].properties
      const featureId = data.features[0].id
      const features = data.features

      if (currentProperties.hasOwnProperty('nampro')) {
        // user memilih point yg sdh ada datanya
        console.log('kondisi 1')
        this.setState((state) => {
          return {
            featureId,
            features,
          }
        })
      } else {
        // user mengklik point yang baru dibuat. setelah mengklik luar map
        console.log('kondisi 2')
        this.setState((state) => {
          return {
            featureId,
            features,
          }
        })
      }
    } else {
      // jika user mengklik pada map
      console.log('kondisi 3')
      this.setState((state) => {
        return {
          featureId: null,
        }
      })
    }
  }

  componentDidUpdate(prevProps, nextState) {
    // console.log('this.props.data : ', prevProps.data);
    // console.log('this.state.project : ', nextState.project);
    // console.log('DrawMode = ', this.props.DrawMode);

    // var data = this.drawControl._draw.getAll();
    // console.log('Draw getAll : ',data)

    if (nextState.project !== prevProps.data) {
      console.log('props dan state project !== sama')
      this.setState({
        project: prevProps.data,
        river: prevProps.riverData,
      })
    } else {
      console.log('props dan state project === sama')
    }
  }

  _renderDraw = () => {
    const { layerVisibility } = this.props
    const { featureId, features, project, river } = this.state
    if (layerVisibility.project) {
      // console.log('render draw')
      // console.log('state', project);
      return (
        <Fragment>
          <Source id="river" type="geojson" data={river} />

          <Layer
            id="river"
            type="line"
            source="river"
            paint={{
              'line-color': '#3bb2d0',
              'line-width': 3,
            }}
            onClick={(event) => console.log(event)}
          ></Layer>

          <FormProject featureId={featureId} features={features} />

          <Draw
            ref={(drawControl) => {
              this.drawControl = drawControl
            }}
            data={project}
            onChange={(collection) => this._onProjectUpdated(collection)}
            onDrawSelectionChange={(data) => this._getProjectAttributes(data)}
          />
          {/*

						
						
						
						onChange = { e=>console.log('change',e)}
						onDrawCreate = { e=>console.log('create', e)}
						onDrawActionable = { e=>console.log()}
						onDrawSelectionChange = { e=>console.log('selection',e)}
						onDrawUpdate = {e=>console.log('updated ', e)}


						mode = { this.props.DrawMode }
						onDrawCreate = { collection => this._onProjectUpdated(collection) }
						onDrawModeChange={							
							({ mode }) => this.props.changeDrawMode({ mode })
						}*/}
        </Fragment>
      )
    }
  }

  render() {
    /*const { 
			data,
			project,
			featureId,
			features 
		} = this.state;*/

    /*const {
			layerVisibility
		} = this.props*/

    return (
      <Fragment>
        {this._renderDraw()}
        {/*this.props.layerVisibility.project &&	*/}
        {/*paint={{
						'circle-radius': 6,
    				'circle-color': '#6bd675'
					}}*/}
      </Fragment>
    )
  }
}

ProjectMark.propTypes = {
  // semua data dari parent comp
  data: PropTypes.object,
  riverData: PropTypes.object,
  layerVisibility: PropTypes.object,
  _onProjectUpdated: PropTypes.func,
  _getProjectAttributes: PropTypes.func,
  _renderDraw: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  layerVisibility: makeSelectLayerVisibility(),
  DrawMode: makeSelectDrawMode(),
})

function mapDispatchToProps(dispatch) {
  return {
    changeDrawMode: (value) => dispatch(changeDrawModeAction(value)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(ProjectMark)
