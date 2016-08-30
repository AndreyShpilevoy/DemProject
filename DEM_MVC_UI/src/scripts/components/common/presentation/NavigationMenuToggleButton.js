import React from "react";

const NavigationMenuToggleButton = () => {
  return(
    <button type="button" className="hidden-lg-up navbar-toggler" id="menu-toggle-button">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
    </button>
  );
};

export default NavigationMenuToggleButton;
