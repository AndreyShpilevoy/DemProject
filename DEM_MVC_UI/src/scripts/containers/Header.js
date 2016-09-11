import React from 'react';
import { Header as HeaderComponent } from "../components/_all";
import { ShrinkingHeader, CollapseMenu } from "../reactLess/_all";

class Header extends React.Component {
  componentDidMount() {
    ShrinkingHeader();
    CollapseMenu.init("menu-toggle-button","nav-menu-content");
  }

  render(){
    return(
      <HeaderComponent />
    );
  }
}

export default Header;
