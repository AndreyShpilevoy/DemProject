import React, {PropTypes} from 'react';

class BbCode_BaseSpan extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string.isRequired,
    styleObject: PropTypes.object
  }
  render() {
    const { children, className, styleObject } = this.props;
    return (
      <span
        className = {className}
        style={styleObject}>
        {children}
      </span>
    );
  }
}

export default BbCode_BaseSpan;
