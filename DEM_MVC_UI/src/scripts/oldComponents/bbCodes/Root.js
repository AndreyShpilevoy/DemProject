import React, {PropTypes} from 'react';

class Root extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;

    return (
      <span
        className = 'bbCode-root'>
        {children}
      </span>
    );
  }
}

export default Root;
