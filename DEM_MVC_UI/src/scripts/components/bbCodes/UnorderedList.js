import React from 'react';

class UnorderedList extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }
  render() {
    const { children } = this.props;
    return <ul className="bbCode-unordered-list">
      {children}
    </ul>;
  }
}

export default UnorderedList;
