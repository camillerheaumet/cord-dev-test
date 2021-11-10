import React from "react";
import styled from 'styled-components';
import { NavLink as Link } from "react-router-dom";

import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";
import * as CgIcons from 'react-icons/cg';

export default class SideNavBar extends React.Component {
  render () {
    const { isOpen, handleSidebar } = this.props;

    return (
      <SideNavBarCont className={isOpen ? 'visible' : ''}>
        <CgIcons.CgClose className="closeButton mobile_only_input" onClick={handleSidebar} />
        <SideNavMainLink className="menu_nav_link main_nav_link" to="/" exact>
          Home
          <NavIcon arrow><img src={Arrow} alt="Arrow icon"/></NavIcon>
        </SideNavMainLink>
        <SideNavMainLink className="menu_nav_link" to="/discover">
          Discover
          <NavIcon search><img src={SearchWhite} alt="Search icon"/></NavIcon>
        </SideNavMainLink>
        <SideNavHeader><HeaderText>Watched</HeaderText></SideNavHeader>
        <NavLink className="menu_nav_link" to="/watched/movies">Movies</NavLink>
        <NavLink className="menu_nav_link" to="/watched/tv-shows">Tv Shows</NavLink>
        <SideNavHeader><HeaderText>Saved</HeaderText></SideNavHeader>
        <NavLink className="menu_nav_link" to="/saved/movies">Movies</NavLink>
        <NavLink className="menu_nav_link" to="/saved/tv-shows">Tv Shows</NavLink>
      </SideNavBarCont>
    );
  }
}

const SideNavBarCont = styled.div`
  position: fixed;
  z-index: 9;
  width: 280px;
  height: 100%;
  background-color: ${colors.sideNavBar};
  @media only screen and (max-width: 1023px){
    padding-top: 40px;
    width 100%;
    top: 0;
    left: -100%;
    transition: 850ms;

    &.visible {
      left: 0;
      transition: 350ms;
    }
  }
`

const SideNavMainLink = styled(Link)`
  position: relative;
  display: block;
  padding: 25px 35px;
  font-size: 1.6em;
  font-weight: 700;
  color: ${colors.lightBackground};
`

const NavIcon = styled.div`
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
`

const SideNavHeader = styled.div`
  padding: 25px 35px 25px 0;
  margin-left: 35px;
  font-size: 1.6em;
  font-weight: 700;
  color: ${colors.lightBackground};
  border-bottom: 1px solid ${colors.lightBackground};
`

const HeaderText = styled.div`

`

const NavLink = styled(Link)`
  display: block;
  padding: 15px 35px 0;
  color: ${colors.lightBackground};
`