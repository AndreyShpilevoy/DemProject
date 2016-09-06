import React, { PropTypes } from 'react';
import {sortBy} from 'lodash';
import NavigationLink from './NavigationLink';

class NavigationLinksLayout extends React.Component {
  static propTypes = {
    navigationLinks: PropTypes.array.isRequired
  }

  render() {
    return (
        <ul className="nav navbar-nav flex-container flex-container-column-lg-down" id="nav-menu-content">
          {
            sortBy(this.props.navigationLinks, "sequence").map(navigationLink =>
            <NavigationLink key={navigationLink.id} navigationLink = {navigationLink} />)
          }
        </ul>
    );
  }
}

export default NavigationLinksLayout;
