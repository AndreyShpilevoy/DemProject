import React, { PropTypes } from 'react';
import _ from 'lodash';
import NavigationLinkItem from 'Atoms/NavigationLinkItem';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class NavigationLinkArray extends React.Component {
  static propTypes = {
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
        <ul className={`${styles.navigationLinksArray} ${commonStyles.flexRowLgUp}`}>
          {navigationLinks}
        </ul>
    );
  }
}

export default NavigationLinkArray;
