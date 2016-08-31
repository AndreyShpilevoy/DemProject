import React, {PropTypes} from 'react';
import NavigationLinks from "./navigation/NavigationLinks";
import NavigationLinkLogo from "./navigation/NavigationLinkLogo";
import NavigationMenuToggleButton from "./navigation/NavigationMenuToggleButton";

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
                <NavigationMenuToggleButton/>
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
