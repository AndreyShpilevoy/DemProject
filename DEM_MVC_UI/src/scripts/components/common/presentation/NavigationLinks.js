import React from 'react';
import { Link, IndexLink } from 'react-router';

const NavigationLinks = () => {
  return (
    <ul className="nav navbar-nav flex-container flex-container-column-lg-down" id="nav-menu-content">
      <li className="nav-item">
        <IndexLink className="nav-link" activeClassName="active" to="/">ForumsPage</IndexLink>
        <div className="nav-link-separator"/>
      </li>
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/topics">TopicsPage</Link>
        <div className="nav-link-separator"/>
      </li>
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/">Link 3</Link>
        <div className="nav-link-separator"/>
      </li>
    </ul>
  );
};

export default NavigationLinks;
