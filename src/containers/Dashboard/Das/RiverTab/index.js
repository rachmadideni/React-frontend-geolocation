import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'

import AddRiver from './AddRiver'

class RiverTab extends Component {
  /*constructor(props){
		super(props);
		
	}*/

  componentDidMount() {
    // console.log('river tab:',this.props);
  }

  render() {
    let { DasInnerActionValue } = this.props
    return (
      <Grid container direction="column" wrap="nowrap">
        {DasInnerActionValue === 'NEW' && (
          <Fragment>
            <AddRiver />
          </Fragment>
        )}
        {DasInnerActionValue === 'UPDATE' && (
          <Fragment>
            <div>UPDATE</div>
          </Fragment>
        )}
      </Grid>
    )
  }
}

export default RiverTab
