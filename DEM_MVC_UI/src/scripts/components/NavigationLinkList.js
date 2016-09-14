import React, { PropTypes } from 'react';
import _ from 'lodash';
import { NavigationLinkItem } from "./_all";

class NavigationLinkList extends React.Component {
  static propTypes = {
    navigationLinkList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
   })).isRequired
  }

  sortNavigationLinks = () => {
    return  _.sortBy(this.props.navigationLinkList, "order");
  }

  mapNavigationLinks = () => {
    let mappedChapters = this.sortNavigationLinks().map(navigationLinkItem =>
      <NavigationLinkItem key={navigationLinkItem.id} navigationLinkItem = {navigationLinkItem} />);
    return mappedChapters;
  }

  render() {
    let navigationLinks = this.mapNavigationLinks();
    return (
        <ul className="nav navbar-nav flex-container flex-container-column-lg-down" id="nav-menu-content">
          {navigationLinks}
        </ul>
    );
  }
}

export default NavigationLinkList;
