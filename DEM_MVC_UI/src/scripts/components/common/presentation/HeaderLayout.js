import React from 'react';
import NavigationLinks from "../NavigationLinks";
import NavigationLinkLogo from "./navigation/NavigationLinkLogo";
import NavigationMenuToggleButton from "./navigation/NavigationMenuToggleButton";

const HeaderLayout = () => {
  return(
    <div className="container navbar-fixed-top">
      <div className="row margin-initial">
        <div className="col-xs-12 padding-initial flex-container-column-lg-up">
          <nav id="header" className="navbar navbar-full navbar-height navbar-logo-bg padding-initial">
            <div className="row margin-initial heigth-inherit">
              <div className="flex-container col-xs-12 col-lg-4 padding-initial heigth-inherit">
                <div className="flex-element-1 flex-container-left flex-container-top-center">
                  <NavigationLinkLogo />
                </div>
                <NavigationMenuToggleButton/>
              </div>
              <div className="col-xs-12 col-lg-8 padding-initial flex-container-column-lg-down flex-container-right-lg-up flex-container-top-center-lg-up">
                <NavigationLinks />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
