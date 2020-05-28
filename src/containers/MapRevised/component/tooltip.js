import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  && {
    position: absolute;
    top: 0;
    width: 150px;
    height: 150px;
    background-color: #eaeaea;
    border: solid 1px #000000;
  }
`
class Tooltip extends Component {
  render() {
    return <Container>{'container item'}</Container>
  }
}

export default Tooltip
