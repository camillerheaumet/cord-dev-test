import React from "react";
import styled from 'styled-components';

import * as colors from "../../colors";
import * as BiIcons from 'react-icons/bi';

export default class CheckBox extends React.Component {
  // Create a custom checkbox component
  
  render () {
    const { checkbox, type, checked, handleCheckboxClicked } = this.props

    return (
      <CheckboxCont onClick={() => handleCheckboxClicked(checkbox, type, !checked)}>
        <Box className={checked ? 'checked' : ''}>{checked && <BiIcons.BiCameraMovie className="checkIcon" />}</Box>
        {checkbox.name}
      </CheckboxCont>
    )
  }
}

const CheckboxCont = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding-bottom: 10px;
`

const Box = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  
  border: 1px solid ${colors.sideNavBar};
  border-radius: 3px;

  &.checked {
    background-color: ${colors.sideNavBar};
  }

  .checkIcon{
    fill: ${colors.lightBackground};
    width: 70%;
    padding: 0 2px;
  }
`