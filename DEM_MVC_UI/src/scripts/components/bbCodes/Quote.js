import React, {PropTypes} from 'react';

class Quote extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    attributes: PropTypes.shape({
      className: PropTypes.string,
      style: PropTypes.object,
    })
  }
  render() {
    const { children } = this.props;
    const { className, style } = this.props.attributes;
    return (
      <blockquote
        className = {className ? `bbCode-quote ${className}` : "bbCode-quote"}
        style = {style ? style : null}>
        {children}
      </blockquote>
  );
  }
}

export default Quote;
