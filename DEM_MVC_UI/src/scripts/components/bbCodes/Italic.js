import React, {PropTypes} from 'react';

class Italic extends React.Component {
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
        className={className ? `bbCode-italic ${className}` : "bbCode-italic"}
        style={style ? Object.assign({}, style, { fontStyle: 'italic' }) : { fontStyle: 'italic' }}>
        {children}
      </span>
    );
  }
}

export default Italic;
