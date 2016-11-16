import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './index.scss';

class NavigationLinkItem extends React.Component {
  static propTypes = {
    navigationLinkItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired
  };

  render(){
    return (
      <li className={styles.navigationLinkItemContainer}>
        <Link className={styles.navigationLinkItem} to={this.props.navigationLinkItem.href}>
          {this.props.navigationLinkItem.title}
        </Link>
        <div className={styles.navigationLinkItemSeparator}/>
      </li>
    );
  }
}

export default NavigationLinkItem;
