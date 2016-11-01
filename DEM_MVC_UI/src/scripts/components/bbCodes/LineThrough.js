import React, {PropTypes} from 'react';

class LineThrough extends React.Component {
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
        className={className ? `bbCode-line-through ${className}` : "bbCode-line-through"}
        style={style ? Object.assign({}, style, { textDecoration: 'line-through' }) : { textDecoration: 'line-through' }}>
        {children}
      </span>
    );
  }
}

export default LineThrough;
