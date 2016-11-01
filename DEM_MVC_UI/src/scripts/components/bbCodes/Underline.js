import React, {PropTypes} from 'react';

class Underline extends React.Component {
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
        className={className ? `bbCode-underline ${className}` : "bbCode-underline"}
        style={style ? Object.assign({}, style, { textDecoration: 'underline' }) : { textDecoration: 'underline' }}>
        {children}
      </span>
    );
  }
}

export default Underline;
