/**
 *
 * Dialog
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseDialog from '@material-ui/core/Dialog';
// import { dimension } from 'styles/constants';

const StyledDialog = styled(BaseDialog).attrs({
  classes: {
    paperFullScreen: 'paper-full-screen',
    paperFullWidth: 'paper-full-width',
    paperWidthSm: 'paper-width-sm',
  },
})`
  
`;
  /*&& {
    .paper-full-screen {
      max-height: ${dimension.maxHeight.main}px;
      max-width: ${dimension.maxWidth.main}px;
    }
    .paper-full-width {
      max-width: ${dimension.maxWidth.main}px;
    }
  }*/

function Dialog(props) {
  return <StyledDialog {...props} />;
}

Dialog.propTypes = {};

export default Dialog;
