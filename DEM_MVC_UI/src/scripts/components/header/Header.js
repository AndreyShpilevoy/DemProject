import React from 'react';
import HeaderPresenter from "./presentation/HeaderPresenter";
import shrinkingHeader from "../../other/shrinkingHeader";
import collapseMenu from "../../other/collapseMenu";

class Header extends React.Component {
  componentDidMount() {
    shrinkingHeader();
    collapseMenu.init("menu-toggle-button","nav-menu-content");
  }

  render(){
    return(
      <HeaderPresenter />
    );
  }
}

export default Header;
