import React from 'react';

class Root extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return <span className="bbCode-root">
      {this.props.children}
    </span>;
  }
}

export default Root;
