import React, {PropTypes} from 'react';

class BaseSpan extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string.isRequired
  }
  render() {
    const { children, className } = this.props;
    return (
      <span
        className = {className}>
        {children}
      </span>
    );
  }
}

export default BaseSpan;