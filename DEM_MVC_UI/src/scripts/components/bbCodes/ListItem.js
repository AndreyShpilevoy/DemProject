import React from 'react';

class ListItem extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }
  render() {
    const { children } = this.props;
    return <li className="bbCode-list-item">
      {children}
    </li>;
  }
}

export default ListItem;
