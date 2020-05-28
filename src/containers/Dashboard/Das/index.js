import React, { Fragment } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import DasModeTab from './DasModeTab'
import RiverTab from './RiverTab'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { DasInnerTabValue, DasInnerActionValue } from '../selectors'
import { changeDasInnerTabValueAction } from '../action'

const TabContainer = styled(Grid)`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
`

class DasTab extends React.Component {
  handleTab = (event, value) => {
    this.props.changeDasInnerTabValue(value)
  }

  render() {
    let { DasInnerTabValue, DasInnerActionValue } = this.props

    return (
      <TabContainer container direction="column" wrap="nowrap">
        <Tabs value={DasInnerTabValue} onChange={this.handleTab}>
          <Tab label="MODE" />
          <Tab label="SUNGAI" />
        </Tabs>
        {DasInnerTabValue === 0 && (
          <Fragment>
            <DasModeTab />
          </Fragment>
        )}
        {DasInnerTabValue === 1 && DasInnerActionValue === 'NEW' && (
          <Fragment>
            <RiverTab DasInnerActionValue={DasInnerActionValue} />
          </Fragment>
        )}
      </TabContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  DasInnerTabValue: DasInnerTabValue(),
  DasInnerActionValue: DasInnerActionValue(),
})

function mapDispatchToProps(dispatch) {
  return {
    changeDasInnerTabValue: (value) =>
      dispatch(changeDasInnerTabValueAction(value)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(DasTab)
