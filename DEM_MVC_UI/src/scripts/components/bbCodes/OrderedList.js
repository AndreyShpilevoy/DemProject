import React from 'react';

class OrderedList extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }
  render() {
    const { children } = this.props;
    return <ol className="bbCode-unordered-list">
      {children}
    </ol>;
  }
}

export default OrderedList;
