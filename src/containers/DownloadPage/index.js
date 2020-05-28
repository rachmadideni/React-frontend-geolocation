import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { downloadExportAction } from '../Map/action'

import { makeSelectLoading, makeSelectExportFileName } from '../Map/selectors'

import saga from '../Map/saga'
import injectSaga from '../../utils/injectSaga'

import LoadingDialog from '../../components/LoadingDialog'

import { api } from '../../environtments'
import { saveAs } from 'file-saver'

class DownloadPage extends React.Component {
  _onClickExport = () => {
    let filename = 'exportData'
    return this.props.downloadExport(filename)
  }

  // _createBlob = jsonFile => {
  // 	let file = new Blob([JSON.stringify(jsonFile)],{
  // 		type:'application/json',
  // 		name:
  // 	});
  // }

  _downloadFile = () => {
    const { ExportFileName } = this.props
    saveAs(`${api.host}/api/static/${ExportFileName}`, 'export.json')
  }

  render() {
    const { isLoading, ExportFileName } = this.props
    // const fileLocation = `${api.host}/api/static/${ExportFileName}`
    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        style={{
          width: '40%',
          height: '100%',
          padding: 20,
        }}
      >
        <LoadingDialog isLoading={isLoading} />

        <Grid item>
          <Typography
            variant="h6"
            color="inherit"
            style={{
              flexGrow: 1,
              fontSize: 18,
              paddingLeft: 10,
            }}
          >
            {'Download Data Sungai dan Proyek'}
          </Typography>
          <Typography variant="body1">
            {`
							Gunakan tombol export data untuk menggenerate data sungai dan project yang telah dibuat.
							selanjutnya klik link "Download File" dan simpan ke komputer anda. 
							Data generate ini selanjutnya bisa diupload melalui website Dinas PU Kabupaten Pangkep`}
          </Typography>
        </Grid>

        <Grid
          item
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '50px',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={this._onClickExport}
            style={{ marginTop: 10 }}
          >
            Export Data
          </Button>
          <Typography color="primary" variant="subtitle1">
            {ExportFileName && (
              <React.Fragment>
                {/*<Link 
									color="primary" 
									target="_blank" 
									href={'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(ExportFileName))}
									download={`output.json`}
									>Download File
								</Link>*/}

                <Link color="primary" href="#" onClick={this._downloadFile}>
                  Download File
                </Link>
              </React.Fragment>
            )}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  ExportFileName: makeSelectExportFileName(),
})

function mapDispatchToProps(dispatch) {
  return {
    downloadExport: (filename) => dispatch(downloadExportAction(filename)),
  }
}

const withSaga = injectSaga({ key: 'downloadSaga', saga })

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect, withSaga)(DownloadPage)
