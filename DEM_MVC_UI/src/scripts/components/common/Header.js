import React from 'react';
import HeaderLayout from "./presentation/HeaderLayout";
import shrinkingHeader from "../../other/shrinkingHeader";
import collapseMenu from "../../other/collapseMenu";

class Header extends React.Component {
  componentDidMount() {
    shrinkingHeader();
    collapseMenu.init("menu-toggle-button","nav-menu-content");
  }

  render(){
    return(
      <HeaderLayout />
    );
  }
}

export default Header;
