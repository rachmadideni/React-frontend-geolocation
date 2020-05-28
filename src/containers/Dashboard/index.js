import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Switch, Route } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

// COMPONENT
import DrawerMenu from './DrawerMenu'

// PAGES
import MapUtama from '../MapRevised'
import MapDraw from '../Map'
import DownloadPage from '../DownloadPage'
import UploadShapePage from '../UploadShapePage'

import { makeSelectDrawerState } from '../Map/selectors'
import { changeDrawerStateAction } from '../Map/action'

import LogoPU from '../../icons/logo_pu'

class Dashboard extends React.Component {
  toggleDrawer = () => {
    const { drawerState } = this.props
    return this.props.changeDrawerState(!drawerState)
  }

  render() {
    const { history, drawerState } = this.props

    return (
      <Grid
        container
        direction="column"
        wrap="nowrap"
        style={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Grid item display="flex">
          <AppBar elevation={0} position="static" color="primary">
            <Toolbar>
              <IconButton onClick={this.toggleDrawer}>
                <MenuIcon fontSize="small" style={{ color: 'white' }} />
              </IconButton>

              <Grid
                container
                style={{
                  paddingLeft: 10,
                  paddingTop: 15,
                  margin: 0,
                  justifyContent: 'center',
                }}
              >
                <LogoPU
                  style={{
                    width: 28,
                    height: 28,
                    paddingBottom: '0px',
                  }}
                />

                <Typography
                  variant="body1"
                  color="inherit"
                  style={{
                    flexGrow: 1,
                    fontSize: 18,
                    paddingLeft: 10,
                  }}
                >
                  {'SIG Dinas Kabupaten Pangkep'}
                </Typography>

                {/*<IconButton disableRipple>
								<AccountIcon fontSize="small" style={{ color:'white' }} />
							</IconButton>*/}
              </Grid>
            </Toolbar>

            <Drawer
              open={drawerState}
              onClose={this.toggleDrawer}
              style={{ color: '#333333' }}
            >
              <DrawerMenu history={history} toggleDrawer={this.toggleDrawer} />
            </Drawer>
          </AppBar>
        </Grid>

        <Grid
          item
          display="flex"
          style={{
            width: '100vw',
            height: '90vh',
            flex: '1',
            marginTop: '0px',
            padding: '0px',
            backgroundColor: 'white',
          }}
        >
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={() => <MapUtama history={history} />}
            />

            <Route
              exact
              path="/draw/:type(riverShape|riverAtribut|project)"
              render={() => <MapDraw history={history} />}
            />

            <Route
              exact
              path="/download"
              render={() => <DownloadPage history={history} />}
            />

            <Route
              exact
              path="/upload/shape"
              render={() => <UploadShapePage history={history} />}
            />
          </Switch>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  drawerState: makeSelectDrawerState(),
})

function mapDispatchToProps(dispatch) {
  return {
    changeDrawerState: (value) => dispatch(changeDrawerStateAction(value)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Dashboard)
