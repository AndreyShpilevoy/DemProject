import React from 'react';

class Italic extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }
  render() {
    const { children } = this.props;
    return <span className="bbCode-italic" style={{ fontStyle: 'italic' }}>
      {children}
    </span>;
  }
}

export default Italic;
