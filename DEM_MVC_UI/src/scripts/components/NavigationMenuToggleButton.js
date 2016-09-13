import React from "react";

const NavigationMenuToggleButton = () => {
  return(
    <div className="flex-element-1 flex-container-right flex-container-column-center navigation-menu-toggle-button-container">
      <button type="button" className="hidden-lg-up navigation-toggler-button" id="menu-toggle-button">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"/>
        <span className="icon-bar"/>
        <span className="icon-bar"/>
      </button>
    </div>
  );
};

export default NavigationMenuToggleButton;
