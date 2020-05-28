import React from 'react'
import styled from 'styled-components'

const contentStyle = {
  top: '6px',
  left: '10px',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  transition: 'none',
}

const Box1 = styled.div`
  width: 450px;
  height: 400px;
  padding: 0;
  position: absolute;
  top: -300px;
  left: -650px;
  right: 0px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 28px;
  padding-right: 28px;
  background-color: white;
`

function BadgeRiver(props) {
  return (
    <React.Fragment>
      <Box1></Box1>
    </React.Fragment>
  )
}

const CustomHelper = ({ content }) => (
  <React.Fragment>
    <BadgeRiver />
  </React.Fragment>
)

export { contentStyle, CustomHelper }
