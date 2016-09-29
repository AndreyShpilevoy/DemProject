import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
      <li className="nav-list-item">
        <Link className="nav-link" to={this.props.navigationLinkItem.href}>
          {this.props.navigationLinkItem.title}
        </Link>
        <div className="nav-link-separator"/>
      </li>
    );
  }
}

export default NavigationLinkItem;
