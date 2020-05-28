import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { GET_OPTIONS_ACTION } from '../../../../Map/constants'

import { getOptionsAction } from '../../../../Map/action'
import saga from '../../../../Map/saga'
import injectSaga from '../../../../../utils/injectSaga'
import { makeSelectOptions } from '../../../../Map/selectors'

class UpdateRiver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kecamatan: '',
      sungai: '',
    }
  }

  componentDidMount() {
    this.props.getOptions('kecamatan')
  }

  handleChange = (event, name) => {
    this.setState((prevState) => ({
      [name]: event.target.value,
    }))
  }

  render() {
    let { kecamatan, sungai } = this.state
    let { options } = this.props
    return (
      <Grid item xs style={{ width: '90%' }}>
        <form noValidate autoComplete="off">
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: 20,
            }}
          >
            Update Sungai
          </Typography>

          <Typography variant="caption" gutterBottom>
            fitur untuk mengupdate garis sungai
          </Typography>

          <TextField
            id="nmsung"
            placeholder="masukkan nama sungai"
            label="Sungai"
            value={sungai}
            onChange={(event) => this.handleChange(event, 'sungai')}
            margin="normal"
            fullWidth
          />

          <TextField
            select
            id="nmkecm"
            label="kecamatan"
            value={kecamatan}
            onChange={(event) => this.handleChange(event, 'kecamatan')}
            margin="normal"
            fullWidth
          >
            {options.kecamatan.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => alert(1)}
            style={{ marginTop: 10 }}
          >
            Simpan
          </Button>
        </form>
      </Grid>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  options: makeSelectOptions(),
})

function mapDispatchToProps(dispatch) {
  return {
    getOptions: (key) => dispatch(getOptionsAction(key)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withSaga = injectSaga({ key: 'riverTab', saga })

export default compose(withSaga, withConnect)(UpdateRiver)
