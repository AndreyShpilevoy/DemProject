import React from 'react';
import { NavigationLinkList } from "../containers/_all";
import { NavigationLinkLogo, NavigationMenuToggleButton } from "./_all";
import { ShrinkingHeader, ToggleClass } from "../utils/_all";

class Header extends React.Component {
  componentDidMount() {
    ShrinkingHeader.init();
    ToggleClass.init("menu-toggle-button", "nav-menu-content", "nav-links-opened", true);
  }
    render() {
    return(
      <div className="container navbar-fixed-top">
        <div className="row">
          <div className="col-xs-12">
            <nav id="header" className="navbar navbar-full header-height header-logo-bg padding-initial">
              <div className="row heigth-inherit">
                <div className="flex col-xs-12 col-lg-4 heigth-inherit">
                  <NavigationLinkLogo />
                  <NavigationMenuToggleButton />
                </div>
                <NavigationLinkList />
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
