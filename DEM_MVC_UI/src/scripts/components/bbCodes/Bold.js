import React from 'react';

class Bold extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }
  render() {
    const { children } = this.props;
    return <span className="bbCode-bold" style={{ fontWeight: 'bold' }}>
      {children}
    </span>;
  }
}

export default Bold;
