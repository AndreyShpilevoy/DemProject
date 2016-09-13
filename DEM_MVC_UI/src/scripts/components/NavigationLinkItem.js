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
  navigationLinkItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
  }).isRequired
};

export default NavigationLinkItem;
