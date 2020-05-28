import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import moment from 'moment'
import DatePicker from 'react-mobile-datepicker'
import { DropzoneDialog } from 'material-ui-dropzone'

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import Chip from '@material-ui/core/Chip'
import InfoIcon from '@material-ui/icons/Info'

// import LocationOnIcon from '@material-ui/icons/LocationOn';

class DashboardTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDatePickerOpen: false,
      idsungai: this.props.selectedRiver,
      namaProject: null,
      tahunProject: null,
      keterangan: null,
      openUploadDialog: false,
      files: [],
      isFormEditable: false,
    }

    this.handleTextChange = this.handleTextChange.bind(this)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedRiver !== prevState.selectedRiver) {
      return { idsungai: nextProps.selectedRiver }
    } else return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.marker !== this.props.marker) {
      // this.setState({ idsungai: prevProps.selectedRiver });
      if (this.props.marker.length > 1) {
        // alert(2);
        this.setState({
          isFormEditable: false,
        })
      } else {
        this.setState({
          isFormEditable: true,
        })
      }
    }
  }

  handleTextChange(field, value) {
    this.setState({
      [field]: value,
    })
  }

  getTahunProject() {
    const { tahunProject } = this.state
    if (!tahunProject) {
      return {
        date: moment().toDate(),
        display: '',
      }
    }
    return {
      date: moment(tahunProject).toDate(),
      display: moment(tahunProject).format('YYYY'),
    }
  }

  handleUpload(files) {
    console.log(files)
    this.setState({
      files: files,
    })
  }

  handleOpenUploadDialog() {
    this.setState({
      openUploadDialog: true,
    })
  }
  handleCloseUploadDialog() {
    this.setState({
      openUploadDialog: false,
    })
  }

  render() {
    const {
      // idsungai,
      namaProject,
      keterangan,
      isFormEditable,
    } = this.state

    return (
      <Grid
        container
        wrap="nowrap"
        style={{
          paddingTop: 10,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <Grid item xs align="center" style={{ marginTop: 20 }}>
          <Chip
            label="Klik Map untuk menambahkan Marka Project "
            color="default"
            icon={<InfoIcon style={{ color: 'orange' }} />}
          />

          <form
            noValidate
            autoComplete="off"
            style={{
              height: '400px',
            }}
          >
            {/*<IconButton>
							<LocationOnIcon color="secondary" />
						</IconButton>*/}

            {/*<TextField 
							id="addMarker"
							name="addMarker"
							label="Marker"
							margin="normal"
							fullWidth
							inputProps={{
								readOnly: true,
							}}
							InputProps={{								
								startAdornment:(
									<InputAdornment position="start">
										<LocationOnIcon color="secondary" />	
									</InputAdornment>
								)
							}} />*/}

            {/*<Button 							
							variant="contained"
							color="secondary"
							fullWidth
							onClick={()=>alert(1)}
							style={{ marginTop:10 }}>
							<LocationOnIcon style={{ color:'white',paddingRight:10 }}/>
                  			Add Marker
                		</Button>*/}

            <TextField
              id="namaProject"
              name="namaProject"
              label="Nama Project"
              value={namaProject}
              onChange={(e) =>
                this.handleTextChange('namaProject', e.target.value)
              }
              margin="normal"
              fullWidth
              style={{
                fontSize: 14,
              }}
              disabled={isFormEditable ? false : true}
            />

            <TextField
              id="tahunProject"
              label="Tahun Project"
              value={this.getTahunProject().display}
              margin="normal"
              inputProps={{
                readOnly: true,
              }}
              onFocus={() =>
                this.setState({
                  isDatePickerOpen: true,
                })
              }
              fullWidth
              style={{
                fontSize: 14,
              }}
              disabled={isFormEditable ? false : true}
            />

            <TextField
              id="keterangan"
              label="Keterangan"
              value={keterangan}
              onChange={(e) =>
                this.handleTextChange('keterangan', e.target.value)
              }
              margin="normal"
              fullWidth
              multiline
              rows={4}
              style={{
                fontSize: 14,
              }}
              disabled={isFormEditable ? false : true}
            />

            <Button
              disabled={isFormEditable ? false : true}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={this.handleOpenUploadDialog.bind(this)}
              style={{
                marginBottom: 15,
              }}
            >
              <PhotoCameraIcon style={{ paddingRight: 10 }} />
              Upload File
            </Button>
            <DropzoneDialog
              open={this.state.openUploadDialog}
              onSave={this.handleUpload.bind(this)}
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              showPreviews={true}
              maxFileSize={5000000}
              onClose={this.handleCloseUploadDialog.bind(this)}
            />

            <Button
              disabled={isFormEditable ? false : true}
              variant="contained"
              color="primary"
              fullWidth
            >
              Save
            </Button>
            <DatePicker
              isOpen={this.state.isDatePickerOpen}
              value={this.getTahunProject().date}
              min={moment().subtract(100, 'years').toDate()}
              max={moment().toDate()}
              confirmText={'PILIH TAHUN PROJECT'}
              cancelText={'BATAL'}
              onSelect={(value) => {
                this.handleTextChange(
                  'tahunProject',
                  moment(value).format('YYYY')
                )
                return this.setState({
                  isDatePickerOpen: false,
                })
              }}
              onCancel={() =>
                this.setState({
                  isDatePickerOpen: false,
                })
              }
            />
          </form>
        </Grid>
      </Grid>
    )
  }
}

export default DashboardTab
