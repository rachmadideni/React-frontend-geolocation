import React, { Component, Fragment } from 'react'
import Draw from '@urbica/react-map-gl-draw'

// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import FormRiverAttributes from '../FormLayer/FormRiverAttributes'

import { hapusSungaiAction } from '../action'
import { makeSelectLayerVisibility } from '../selectors'

class RiverMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      river: this.props.data,
      featureId: null,
      features: [],
      dialogOpen: false,
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  onRiverIsUpdated = (collection) => {
    console.log('onRiverIsUpdated:', collection)
    this.setState((state, props) => {
      return {
        river: collection,
      }
    })
  }

  // dipanggil jika ada sungai yg dipilih
  getRiverAttributes = (data) => {
    if (data.features.length > 0) {
      // console.log('onChange:',data.features);
      const availableProperty = data.features[0].properties
      const featureId = data.features[0].id
      const features = data.features

      if (availableProperty.hasOwnProperty('nmsung')) {
        this.setState((state) => {
          return {
            featureId,
            features,
          }
        })
      } else {
        this.setState((state) => {
          return {
            featureId,
            features,
          }
        })
      }
    } else {
      this.setState((state) => {
        return {
          featureId: null,
        }
      })
    }
  }

  hapusSungai = (data) => {
    this.handleDialog(true)
    /*console.log('hapusSungai:',data.features[0].id);
		if(data.features.length > 0){
			let featureId = data.features[0].id
			this.props.hapusSungai(featureId);			
		}*/
  }

  handleDialog = (value) => {
    this.setState({
      dialogOpen: value,
    })
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
    })
  }

  konfirmasiHapus = (props) => {
    return (
      <Dialog open={props.open} onClose={this.handleCloseDialog}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary">lanjutkan</Button>
          <Button color="primary" onClick={this.handleCloseDialog} autoFocus>
            Batal
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    const {
      river,
      // hasAttribute,
      // isRiverSelected,
      featureId,
      features,
      dialogOpen,
    } = this.state
    return (
      <Fragment>
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '20px',
          }}
        >
          {/*JSON.stringify(river)*/}
        </div>
        {this.konfirmasiHapus({
          open: dialogOpen,
          title: 'Hapus data sungai ?',
          text: `aksi aini akan menghapus data sungai dari database. jika anda yakin klik lanjutkan untuk menghapus. 
					klik Batal jika anda ingin membatalkan penghapusan`,
        })}
        <Draw
          data={river}
          onChange={(collection) => this.onRiverIsUpdated(collection)}
          onDrawCombine={(e) => console.log('onDrawCombine', e)}
          onDrawSelectionChange={(data) => this.getRiverAttributes(data)}
          onDrawActionable={(e) => console.log('onDrawActionable:', e)}
        />
        }{/*onDrawDelete={ data => this.hapusSungai(data) }*/}
        <FormRiverAttributes featureId={featureId} features={features} />
      </Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  layerVisibility: makeSelectLayerVisibility(),
})

function mapDispatchToProps(dispatch) {
  return {
    hapusSungai: (value) => dispatch(hapusSungaiAction(value)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(RiverMap)
