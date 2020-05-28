import React, { Component } from 'react'
import Grid from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

export const styles = {
  root: {
    // flexGrow:1,
    width: '30vw',
    position: 'absolute',
    top: 10,
    left: 10,
  },
}

const Container = (props) => <Grid container {...props} />
const Item = (props) => <Grid item {...props} />

class FormProject2 extends Component {
  render() {
    const { classes, justify } = this.props
    return (
      <div className={classes.root}>
        <Container
          direction="column"
          align="center"
          style={{
            display: 'flex',
            flex: 1,
          }}
        >
          <Item
            style={{
              flex: 1,
              boxShadow: 'none',
            }}
          >
            <Typography>kolom 1</Typography>
          </Item>

          <Item
            style={{
              flex: 1,
              boxShadow: 'none',
            }}
          >
            <Typography>kolom 2</Typography>
          </Item>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(FormProject2)
