import React from 'react';
import NavigationLinkArray from "containers/NavigationLinkArray";
import NavigationMenuToggleButton from "components/NavigationMenuToggleButton";
import NavigationLinkLogo from "components/NavigationLinkLogo";
import ToggleClass from "services/domScripts/ToggleClass";
import ShrinkingHeader from "services/domScripts/ShrinkingHeader";

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
                <NavigationLinkArray />
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
