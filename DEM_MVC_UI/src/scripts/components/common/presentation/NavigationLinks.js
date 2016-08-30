import React, { PropTypes } from 'react';
import NavigationLink from './NavigationLink';

class NavigationLinks extends React.Component {
  static propTypes = {
    navigationLinks: PropTypes.array.isRequired
  }

  render() {
    let objectLinksArray = [];
    let navigationLinksArray = this.props.navigationLinks;
    for (let i=0; i < navigationLinksArray.length; i++) {
      objectLinksArray.push(
        <NavigationLink key={navigationLinksArray[i].id} navigationLink = {navigationLinksArray[i]} />
      );
    }
    return (
      <ul className="nav navbar-nav flex-container flex-container-column-lg-down" id="nav-menu-content">
        {objectLinksArray}
      </ul>
    );
  }
}

export default NavigationLinks;
