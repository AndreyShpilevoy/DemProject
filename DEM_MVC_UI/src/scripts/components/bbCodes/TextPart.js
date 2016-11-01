import React, {PropTypes} from 'react';

class TextPart extends React.Component {
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
        className = {className ? `bbCode-text-part ${className}` : "bbCode-text-part"}
        style = {style ? style : null}>
        {children}
      </span>
    );
  }
}

export default TextPart;
