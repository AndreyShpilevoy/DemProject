import React, {PropTypes} from 'react';

class BbCode_Root extends React.Component {
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

export default BbCode_Root;
