import React, {PropTypes} from 'react';

class Paragraph extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    attributes: PropTypes.shape({
      className: PropTypes.string,
      style: PropTypes.object,
    })
  };

  render() {
    const { children } = this.props;
    const { className, style } = this.props.attributes;
    return (
      <p
        className = {className ? `bbCode-paragraph ${className}` : "bbCode-paragraph"}
        style = {style ? style : null}>
        {children}
      </p>
    );
  }
}

export default Paragraph;
