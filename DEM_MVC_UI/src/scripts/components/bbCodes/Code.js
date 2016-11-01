import React, {PropTypes} from 'react';

class Code extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    attributes: PropTypes.shape({
      className: PropTypes.string,
      style: PropTypes.object,
    })
  }
  render() {
    const { children } = this.props;
    const { className, style } = this.props.attributes;
    return (
      <pre
        className = {className ? `bbCode-code ${className}` : "bbCode-code"}
        style = {style ? style : null}>
        {children}
      </pre>
    );
  }
}

export default Code;
