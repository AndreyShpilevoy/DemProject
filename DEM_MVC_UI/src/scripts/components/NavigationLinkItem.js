import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavigationLinkItem = ({navigationLinkItem}) => {
  return (
    <li className="nav-list-item">
      <Link className="nav-link" to={navigationLinkItem.href}>{navigationLinkItem.title}</Link>
      <div className="nav-link-separator"/>
    </li>
  );
};

NavigationLinkItem.propTypes = {
  navigationLinkItem: PropTypes.object.isRequired
};

export default NavigationLinkItem;
