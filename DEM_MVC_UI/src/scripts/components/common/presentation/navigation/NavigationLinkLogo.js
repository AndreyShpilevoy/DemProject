import React from 'react';
import { Link } from 'react-router';

const NavigationLinkLogo = () => {
  return (
    <Link className="navbar-brand flex-container-column-lg-up" activeClassName="active" to="/">
      <div className="navbar-logo"/>
    </Link>
  );
};

export default NavigationLinkLogo;
