import React from 'react';
import PropTypes from 'prop-types';
import MapGL, { NavigationControl, FullscreenControl} from '@urbica/react-map-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

// action
// selector
// component

class DrawProjectPage extends React.Component {
	render(){
		return (
			<div>project page</div>
		);
	}
}

export default DrawProjectPage; 