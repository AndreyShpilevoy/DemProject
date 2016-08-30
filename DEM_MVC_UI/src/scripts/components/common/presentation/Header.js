import React, {PropTypes} from 'react';
import NavigationLinks from "./NavigationLinks";
import NavigationLinkLogo from "./NavigationLinkLogo";
import NavigationMenuToggleButton from "./NavigationMenuToggleButton";

const Header = ({navigationLinks}) => {
  return(
    <div className="container navbar-fixed-top">
      <div className="row margin-initial">
        <div className="col-xs-12 padding-initial">
          <nav id="header" className="navbar navbar-full navbar-height navbar-logo-bg padding-initial">
            <div className="row margin-initial heigth-inherit">
              <div className="flex-container col-xs-12 col-lg-6 padding-initial heigth-inherit">
                <div className="flex-element-1 flex-container-left flex-container-top-center">
                  <NavigationLinkLogo />
                </div>
                <div className="flex-element-1 flex-container-right flex-container-top-center navigation-menu-toggle-button-container">
                  <NavigationMenuToggleButton/>
                </div>
              </div>
              <div className="col-xs-12 col-lg-6 padding-initial flex-container-right-lg-up flex-container-top-center-lg-up">
                <NavigationLinks navigationLinks={navigationLinks} />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  navigationLinks: PropTypes.array.isRequired
};

export default Header;
