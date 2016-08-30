import React from 'react';
import { Link } from 'react-router';

const NavigationLinkLogo = () => {
  return (
    <Link className="navbar-brand navbar-brand-size" activeClassName="active" to="/">
      <div className="navbar-logo"/>
    </Link>
  );
};

export default NavigationLinkLogo;
