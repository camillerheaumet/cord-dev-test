import React from "react";
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';

import Checkbox from "../checkbox";

export default class ExpandableFilter extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      filtersShown: false
    };
  }

  handleExpand = () => {
    this.setState({ filtersShown: !this.state.filtersShown})
  }

  render () {
    const { filtersShown } = this.state;
    const { title, checkboxes, selection, type, handleCheckboxClicked } = this.props;
    
    return (
      <ExpandableFilterWrapper>
        <ExpandableFilterTitle onClick={this.handleExpand}>
          {filtersShown ? <FaIcons.FaMinus /> : <FaIcons.FaPlus />}
          <h4 className="expandableTitle">{title}</h4>
        </ExpandableFilterTitle>
        <ExpandableCheckboxContainer>
          {filtersShown && checkboxes.map((checkbox, index) => {
            return <Checkbox 
              key={index} 
              handleCheckboxClicked={handleCheckboxClicked} 
              type={type} 
              checkbox={checkbox} 
              // checked={false}
              checked={type === 'genres' ? !!selection.find(s => s === checkbox) : selection === checkbox}
            ></Checkbox>
          })}
        </ExpandableCheckboxContainer>
      </ExpandableFilterWrapper>
    )
  }  
}

const ExpandableFilterWrapper = styled.div`
  
`
const ExpandableFilterTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  h4 {
    padding-left: 10px;
  }
`

const ExpandableCheckboxContainer = styled.div`
  
`