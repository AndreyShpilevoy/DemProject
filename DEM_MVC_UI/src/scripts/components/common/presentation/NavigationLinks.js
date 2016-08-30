import React, { PropTypes } from 'react';
import NavigationLink from './NavigationLink';

class NavigationLinks extends React.Component {
  static propTypes = {
    navigationLinks: PropTypes.array.isRequired
  }

  render() {
    let objectLinksArray = [];
      for (let i=0; i < this.props.navigationLinks.length; i++) {
        objectLinksArray.push(
          <NavigationLink key={this.props.navigationLinks[i].id} navigationLink = {this.props.navigationLinks[i]} />
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
