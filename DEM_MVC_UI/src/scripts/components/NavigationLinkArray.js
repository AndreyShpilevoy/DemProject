import React, { PropTypes } from 'react';
import _ from 'lodash';
import NavigationLinkItem from 'components/NavigationLinkItem';

class NavigationLinkArray extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    navigationLinkArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
   })).isRequired
  }

  orderNavigationLinks = () => {
    return  _.orderBy(this.props.navigationLinkArray, 'order');
  }

  mapNavigationLinks = () => {
    let mappedNavigationLinks = this.orderNavigationLinks().map(navigationLinkItem =>
      <NavigationLinkItem key={navigationLinkItem.id} navigationLinkItem = {navigationLinkItem} />);
    return mappedNavigationLinks;
  }

  render() {
    let navigationLinks = this.mapNavigationLinks();
    return (
        <div className="col-xs-12 col-lg-8 flex nav-links-container flex-column-vertical-center-lg-up">
          <ul className="nav navbar-nav flex nav-links-default" id={this.props.id}>
            {navigationLinks}
          </ul>
        </div>
    );
  }
}

export default NavigationLinkArray;
