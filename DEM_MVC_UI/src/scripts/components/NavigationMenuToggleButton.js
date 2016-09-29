import React from "react";

class NavigationMenuToggleButton extends React.Component {
  render(){
    return(
      <div className="navbar-button-container flex flex-column-vertical-center navigation-menu-toggle-button-container">
        <button type="button" className="hidden-lg-up navigation-toggler-button" id="menu-toggle-button">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
        </button>
      </div>
    );
  }
}

export default NavigationMenuToggleButton;
