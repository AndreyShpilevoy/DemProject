import React, {PropTypes} from 'react';

class Bold extends React.Component {
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
        className={className ? `bbCode-bold ${className}` : "bbCode-bold"}
        style={style ? Object.assign({}, style, { fontWeight: 'bold' }) : { fontWeight: 'bold' }}>
        {children}
      </span>
    );
  }
}

export default Bold;
