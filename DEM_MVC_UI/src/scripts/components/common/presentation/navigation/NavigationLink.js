import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavigationLink = ({navigationLink}) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" activeClassName="active" to={navigationLink.link}>{navigationLink.content}</Link>
      <div className="nav-link-separator"/>
    </li>
  );
};

NavigationLink.propTypes = {
  navigationLink: PropTypes.object.isRequired
};

export default NavigationLink;
