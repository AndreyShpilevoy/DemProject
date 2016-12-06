import React, {PropTypes} from 'react';

class BbCode_Color extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    options: PropTypes.string
  }
  render() {
    const { children } = this.props;
    return (
      <span
        className = 'bbCode-color'
        style = {this.props.options ? { color: this.props.options } : null}>
        {children}
      </span>
    );
  }
}

export default BbCode_Color;
