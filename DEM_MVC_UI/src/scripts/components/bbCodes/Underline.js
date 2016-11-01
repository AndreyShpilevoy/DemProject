import React, {PropTypes} from 'react';

class Underline extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;
    return (
      <span
        className = "bbCode-underline"
        style={{ textDecoration: 'underline' }}>
        {children}
      </span>
    );
  }
}

export default Underline;
