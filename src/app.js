import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';

import SideNavBar from "./components/sidenavbar";

import Discover from "./pages/discover";

import './css/app.css'; 

export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  handleSidebar = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const { handleSidebar } = this;
    const { isOpen } = this.state;
    return (
      <Router>
        <PageContainer>
          <SideNavBar {...this.props} isOpen={isOpen} handleSidebar={handleSidebar}/>
          <ContentWrapper>
            <FaIcons.FaHamburger className="sideBarButton" onClick={handleSidebar} />
            <Switch>
              <Route path="/discover" component={Discover} {...this.props} handleSidebar={handleSidebar}/>
            </Switch>
          </ContentWrapper>
        </PageContainer>
      </Router>
    );
  }
}


const ContentWrapper = styled.main`
  padding-left: 280px;
  @media (max-width: 1023px){
    padding-left: 0;
  }
`

const PageContainer = styled.main`
  overflow-x: hidden;
`
