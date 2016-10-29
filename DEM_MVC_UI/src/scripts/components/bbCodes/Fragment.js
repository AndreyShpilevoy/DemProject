import React from 'react';

class Fragment extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return <span className="bbCode-fragment">
      {this.props.children}
    </span>;
  }
}

export default Fragment;
