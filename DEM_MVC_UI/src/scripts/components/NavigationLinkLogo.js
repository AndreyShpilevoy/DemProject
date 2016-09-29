import React from 'react';
import { Link } from 'react-router';

class NavigationLinkLogo extends React.Component {
  render(){
    return (
      <div className="navbar-logo-container flex flex-column-vertical-center">
        <Link className="navbar-brand flex-container-column-lg-up" to="/">
          <div className="navbar-logo"/>
        </Link>
      </div>
    );
  }
}

export default NavigationLinkLogo;
