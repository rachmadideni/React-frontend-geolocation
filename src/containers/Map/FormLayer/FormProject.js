import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeSelectFormProjectData } from '../../Map/selectors'

import {
  ubahNamaProjectAction,
  ubahTanggalProjectAction,
  ubahKeteranganProjectAction,
  getProjectAttributeAction,
  addProjectAction,
  uploadProjectAction,
  hapusProjectAction,
  deleteUploadAction,
  addProjectPropertiesAction,
  getProjectPropertiesAction,
} from '../../Map/action'

import {
  Wrapper,
  FormWrapper,
  FormInnerWrapper,
  FormHeader,
  ActionButton,
} from '../../../components/Form'

import isEmpty from 'validator/lib/isEmpty'
import moment from 'moment'

import { api } from '../../../environtments'
import ImgsViewer from 'react-images-viewer'

// slider progress
import SliderProgress from '../component/SliderProgress'
// Marker selectors
import MarkerSelector from '../component/MarkerSelector'

import { withStyles } from '@material-ui/core/styles'
import { styles } from './styles'
import Avatar from '@material-ui/core/Avatar'
import TaludIcon from '../../../icons/talud'
import MarkerIcon from '../../../icons/marker'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'

class FormProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      featureId: null,
      features: [],
      error: {
        nampro: null,
        tglpro: null,
      },
      isSubmitted: false,
      files: null,
      isImageViewerOpen: false,
      imageList: [],
      imageIndex: null,
      dialogOpen: false,
      markerOpen: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this._getProjectDate = this._getProjectDate.bind(this)
  }

  _getProjectDate() {
    const { tglpro } = this.props.dt
    if (!tglpro) {
      return {
        tglpro: new Date().toISOString().substring(0, 10),
      }
    }

    return {
      tglpro: moment(tglpro).toDate(),
      displayDate: moment(tglpro).format('YYYY-MM-DD'),
    }
  }

  componentDidUpdate(props, state) {
    if (props.featureId !== this.props.featureId) {
      if (this.props.featureId) {
        this.props.getProjectProperties(this.props.featureId)
      }

      this.setState((state) => {
        return {
          featureId: this.props.featureId,
          features: this.props.features,
        }
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const {
      nampro,
      tglpro,
      // keterangan
    } = this.props.dt

    const { addProject, dt } = this.props

    const { features } = this.state

    this.setState({
      isSubmitted: true,
    })

    if (
      this.validasiNamaProject(String(nampro)) &&
      this.validasiTanggalProject(String(tglpro))
    ) {
      this.props.addProjectProperties({
        features,
        properties: this.props.dt,
      }) // test insert properties ke tabel test_project
    }
    return false
  }

  validasiNamaProject(nama_project) {
    let isError = false
    let errorMsg = null
    if (isEmpty(nama_project)) {
      isError = true
      errorMsg = 'Nama Project tidak boleh kosong'
    } else {
      isError = false
      errorMsg = null
    }

    this.setState((state) => {
      return {
        error: {
          nampro: errorMsg,
        },
      }
    })
    return !isError
  }

  validasiTanggalProject(tanggal_project) {
    let isError = false
    let errorMsg = null
    if (isEmpty(tanggal_project)) {
      isError = true
      errorMsg = 'Tanggal Project tidak boleh kosong'
    } else {
      isError = false
      errorMsg = null
    }

    this.setState((state) => {
      return {
        error: {
          tglpro: errorMsg,
        },
      }
    })
    return !isError
  }

  _handleFileUploadChanges = (event) => {
    console.log('event.target.files :', event.target.files[0])
    if (!!event.target.files && !!event.target.files[0]) {
      this.setState({
        files: event.target.files[0],
      })
    }
    return false
  }

  _handleUpload = () => {
    const { files } = this.state
    const { id } = this.props.dt
    this.props.uploadProject({ files, id })
  }

  _renderFiles = () => {
    const { upload, id } = this.props.dt

    const { featureId } = this.state

    if (upload.length > 0) {
      return upload.map((item, index) => {
        return (
          <a
            onClick={
              featureId && id
                ? (e) => this._handleDialog({ e, item, index })
                : false
            }
            key={index}
          >
            <img
              alt=""
              style={{
                width: '32px',
                height: '32px',
                border: 'solid 1px #354577',
                margin: '2px',
                padding: '2px',
              }}
              src={`${api.host}/api/static/${item.filename}`}
            ></img>
          </a>
        )
      })
    }

    return <h4>tidak ada file upload</h4>
  }

  _handleDialog = ({ e, item, index }) => {
    const n = []
    n.push({
      src: `${api.host}/api/static/${item.filename}`,
      filename: `${item.filename}`,
    })

    this.setState((state, props) => {
      return {
        dialogOpen: true,
        imageList: n,
        imageIndex: index,
      }
    })
  }

  _handleMarker = (value) => {
    this.setState({
      markerOpen: value,
    })
  }

  _renderMarkerDialog = () => {
    const { markerOpen } = this.state
    return (
      <MarkerSelector
        handleMarker={this._handleMarker}
        markerOpen={markerOpen}
      />
    )
  }

  // DIALOG BOX
  _showImageOptions = (e) => {
    const { imageIndex } = this.state
    return (
      <Dialog
        open={this.state.dialogOpen}
        onClose={(e) =>
          this.setState({
            dialogOpen: false,
          })
        }
        onBackdropClick={(e) =>
          this.setState({
            dialogOpen: false,
          })
        }
      >
        <DialogActions>
          <Button
            onClick={(e) => this._deleteImage(e, imageIndex)}
            color="primary"
          >
            Hapus Gambar
          </Button>

          <Button
            onClick={(e) => this._handleImageToShow(e, imageIndex)}
            color="secondary"
          >
            Buka Gambar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  _handleImageToShow = (e, index) => {
    e.preventDefault()
    this.setState((state, props) => {
      return {
        isImageViewerOpen: true,
      }
    })
  }

  _deleteImage = (e, index) => {
    e.preventDefault()
    const { imageList } = this.state
    this.props.deleteUpload(imageList[0].filename)
  }

  _closeImageViewer = () => {
    this.setState((state, props) => {
      return {
        isImageViewerOpen: false,
      }
    })
  }

  _renderImgViewer = () => {
    return (
      <React.Fragment>
        <ImgsViewer
          isOpen={this.state.isImageViewerOpen}
          onClose={this._closeImageViewer}
          imgs={this.state.imageList}
          onClickImg={(e) => console.log(e.target)}
          showThumbnails={false}
        />
      </React.Fragment>
    )
  }

  _handleDelete = () => {
    const { featureId } = this.state
    const d = window.confirm('anda akan menghapus Project')
    if (d === true) {
      this.props.hapusProject(featureId)
      this.props.clearProjectForm()
    }
  }

  render() {
    const { featureId } = this.state

    const {
      dt,
      ubahNamaProject,
      ubahTanggalProject,
      ubahKeteranganProject,
      classes,
    } = this.props

    return (
      <Wrapper>
        {this._renderImgViewer()}
        {this._showImageOptions()}
        {this._renderMarkerDialog()}
        <FormWrapper>
          <FormInnerWrapper
            style={{              
              borderRadius: '0',
              boxShadow: 'none',
              width: '100%',
            }}
          >
            <FormHeader judul="Atribut Project" />

            <form
              noValidate
              autoComplete="off"
              disabled={featureId ? false : true}
              onSubmit={this.handleSubmit}
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              <TextField
                InputProps={{ classes: { input: classes.input } }}
                id="nampro"
                label="nama project"
                autoFocus
                disabled={featureId ? false : true}
                margin="dense"
                fullWidth
                value={dt.nampro}
                error={!!this.state.error.nampro}
                helperText={this.state.error.nampro}
                onChange={(event) => {
                  if (this.state.isSubmitted) {
                    this.validasiNamaProject(event.target.value)
                  }
                  return ubahNamaProject(event.target.value)
                }}
              />

              <TextField
                InputProps={{ classes: { input: classes.input } }}
                id="tglpro"
                label="tanggal project"
                type="date"
                value={this._getProjectDate().displayDate}
                disabled={featureId ? false : true}
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  width: '100%',
                }}
                onChange={(event) => {
                  if (this.state.isSubmitted) {
                    this.validasiTanggalProject(event.target.value)
                  }
                  return ubahTanggalProject(event.target.value)
                }}
              />

              <TextField
                InputProps={{ classes: { input: classes.input } }}
                id="keterangan"
                label="keterangan"
                multiline
                rows={3}
                margin="dense"
                fullWidth
                value={dt.ketera}
                onChange={(event) => {
                  return ubahKeteranganProject(event.target.value)
                }}
                disabled={featureId ? false : true}
              />

              <Grid
                style={{
                  paddingTop: 10 + 'px',
                  paddingBottom: 30 + 'px',
                  boxShadow: 'none',
                }}
              >
                <div
                  style={{
                    paddingLeft: 15 + 'px',
                    paddingRight: 20 + 'px',
                    paddingBottom: 10,
                  }}
                >
                  <SliderProgress
                    disabled={featureId && dt.id ? false : true}
                  />
                </div>

                <Divider />

                <div
                  style={{
                    paddingTop: 10,
                    paddingLeft: 20 + 'px',
                    paddingRight: 20 + 'px',
                    backgroundColor: 'none',
                    height: '35px',
                    marginBottom: '15px',
                  }}
                >
                  <input
                    type="file"
                    name="project"
                    accept="image/*"
                    disabled={featureId && dt.id ? false : true}
                    onChange={this._handleFileUploadChanges}
                  />

                  <Button
                    variant="contained"
                    size="small"
                    success={true}
                    onClick={this._handleUpload}
                    disabled={featureId && dt.id ? false : true}
                  >
                    upload
                  </Button>

                  <div
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '150px',
                      marginBottom: '50px',
                      paddingBottom: '20px',
                    }}
                  >
                    {this._renderFiles()}
                  </div>
                </div>
              </Grid>

              <Grid
                container
                justify="center"
                alignItems="center"
                style={{
                  boxShadow: 'none',
                }}
              >
                <div
                  style={{
                    paddingTop: 10,
                    paddingLeft: 10,
                  }}
                >
                  <Typography
                    color="secondary"
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    marker
                  </Typography>
                  <Tooltip title="marker" placement="left-start">
                    <Avatar
                      className={classes.smallAvatar}
                      onClick={(e) =>
                        this._handleMarker(!this.state.markerOpen)
                      }
                    >
                      <TaludIcon />
                    </Avatar>
                  </Tooltip>
                </div>
              </Grid>

              <Grid
                style={{
                  boxShadow: 'none',
                }}
              >
                <ActionButton
                  size="small"
                  variant="contained"
                  success="true"
                  onClick={this.handleSubmit}
                  fullWidth
                  disabled={
                    featureId ? false : true || !!this.state.error.nampro
                  }
                >
                  Simpan Atribut
                </ActionButton>

                <ActionButton
                  size="small"
                  variant="contained"
                  success={false}
                  fullWidth
                  onClick={this._handleDelete}
                  disabled={
                    featureId ? false : true || !!this.state.error.nampro
                  }
                >
                  Hapus Project
                </ActionButton>
              </Grid>
            </form>
          </FormInnerWrapper>
        </FormWrapper>
      </Wrapper>
    )
  }
}

FormProject.propTypes = {
  featureId: PropTypes.string,
  dt: PropTypes.object, // form data
  validasiNamaProject: PropTypes.func,
  validasiTanggalProject: PropTypes.func,
  ubahNamaProject: PropTypes.func,
  ubahTanggalProject: PropTypes.func,
  ubahKeteranganProject: PropTypes.func,
  getProjectAttribute: PropTypes.func,
  addProject: PropTypes.func,
  handleSubmit: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  dt: makeSelectFormProjectData(),
})

function mapDispatchToProps(dispatch) {
  return {
    ubahNamaProject: (value) => dispatch(ubahNamaProjectAction(value)),
    ubahTanggalProject: (value) => dispatch(ubahTanggalProjectAction(value)),
    ubahKeteranganProject: (value) =>
      dispatch(ubahKeteranganProjectAction(value)),
    getProjectAttribute: (featureId) =>
      dispatch(getProjectAttributeAction(featureId)),
    addProject: (features) => dispatch(addProjectAction(features)),
    uploadProject: (file) => dispatch(uploadProjectAction(file)),
    hapusProject: (featureId) => dispatch(hapusProjectAction(featureId)),
    deleteUpload: (filename) => dispatch(deleteUploadAction(filename)),
    addProjectProperties: (features) =>
      dispatch(addProjectPropertiesAction(features)),
    getProjectProperties: (featureId) =>
      dispatch(getProjectPropertiesAction(featureId)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(withStyles(styles)(FormProject))
