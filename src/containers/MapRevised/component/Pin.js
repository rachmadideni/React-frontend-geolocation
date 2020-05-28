import React, { Fragment, Component } from 'react'
import { RoomSharp } from '@material-ui/icons'

class Pin extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Fragment>
        <RoomSharp
          style={{
            color: 'green',
            fontWeight: 'bold',
            fontSize: 24,
          }}
          onClick={onClick}
        />
      </Fragment>
    )
  }
}

export default Pin
