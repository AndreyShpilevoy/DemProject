import React from 'react';
import { NavigationLinkList } from "../containers/_all";
import { NavigationLinkLogo, NavigationMenuToggleButton } from "./_all";

const Header = () => {
  return(
    <div className="container navbar-fixed-top">
      <div className="row">
        <div className="col-xs-12 flex-container-column-lg-up">
          <nav id="header" className="navbar navbar-full navbar-height navbar-logo-bg padding-initial">
            <div className="row heigth-inherit">
              <div className="flex-container col-xs-12 col-lg-4 heigth-inherit">
                <div className="flex-element-1 flex-container-left flex-container-column-center">
                  <NavigationLinkLogo />
                </div>
                <NavigationMenuToggleButton/>
              </div>
              <div className="col-xs-12 col-lg-8 flex-container-column-lg-down flex-container-right-lg-up flex-container-column-center-lg-up">
                <NavigationLinkList />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
