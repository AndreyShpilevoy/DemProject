import React, { PropTypes } from 'react';
import _ from 'lodash';
import { NavigationLinkItem } from "./_all";

class NavigationLinks extends React.Component {
  static propTypes = {
    navigationLinks: PropTypes.array.isRequired
  }

  render() {
    return (
        <ul className="nav navbar-nav flex-container flex-container-column-lg-down" id="nav-menu-content">
          {
            _.sortBy(this.props.navigationLinks, "sequence").map(navigationLinkItem =>
            <NavigationLinkItem key={navigationLinkItem.id} navigationLinkItem = {navigationLinkItem} />)
          }
        </ul>
    );
  }
}

export default NavigationLinks;
