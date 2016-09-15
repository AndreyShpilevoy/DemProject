import React from 'react';
import { Header as HeaderComponent } from "../components/_all";
import { ShrinkingHeader, ToggleClass } from "../reactLess/_all";

class Header extends React.Component {
  componentDidMount() {
    ShrinkingHeader();
    ToggleClass.init("menu-toggle-button", "nav-menu-content", "nav-links-opened", true);
  }

  render(){
    return(
      <HeaderComponent />
    );
  }
}

export default Header;
