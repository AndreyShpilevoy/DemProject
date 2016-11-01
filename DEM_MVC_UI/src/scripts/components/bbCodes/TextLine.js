import React, {PropTypes} from 'react';

class TextLine extends React.Component {
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
      <span
        className = {className ? `bbCode-text-line ${className}` : "bbCode-text-line"}
        style = {style ? style : null}>
        {children}
      </span>
    );
  }
}

export default TextLine;
