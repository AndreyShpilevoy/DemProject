import React from 'react';

class Code extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }
  render() {
    const { children } = this.props;
    return <pre className="bbCode-code">
      {children}
    </pre>;
  }
}

export default Code;
