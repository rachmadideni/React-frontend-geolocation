// import React from 'react';
import styled from 'styled-components'
import InfoIcon from '@material-ui/icons/InfoOutlined'

const DialogBox = styled.div`
  position: absolute;
  background-color: white;
  width: 200px;
  height: 80px;
  bottom: 2%;
  // right:40%;
  left: 45%;
  border-radius: 0px;
  border: solid 4px #354577;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding-top: 10px;
`

const IconInfoWrap = styled(InfoIcon)`
  padding-top: 4px;
  font-size: 10px;
`
const InfoMode = styled.div`
  position: absolute;
  padding-left: 10px;
  padding-right: 15px;
  padding-bottom: 10px;
  height: 30px;
  top: 10px;
  left: 45%;
  background-color: white;
  opacity: 0.8;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  border: solid 1px #686868;
  margin: 0 auto;
`

export { DialogBox, IconInfoWrap, InfoMode }
