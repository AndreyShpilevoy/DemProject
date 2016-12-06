import React, {PropTypes} from 'react';

class BbCode_ListItem extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;
    return (
      <li
        className = 'bbCode-list-item'>
        {children}
      </li>
    );
  }
}

export default BbCode_ListItem;
