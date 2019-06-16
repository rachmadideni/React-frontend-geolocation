/**
 *
 * LoadingDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../components/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const StyledDialog = styled(props => (
  <Dialog
    {...props}
    classes={{
      paper: 'paper',
    }}
  />
))`
  & .paper {
    overflow: visible;
    background-color: transparent;
    box-shadow: none;
  }
`;

function LoadingDialog(props) {
  return (
    <StyledDialog open={props.isLoading}>
      <CircularProgress color="primary" />
    </StyledDialog>
  );
}

LoadingDialog.propTypes = {
  isLoading: PropTypes.bool,
};

export default LoadingDialog;
