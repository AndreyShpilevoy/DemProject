import React, {PropTypes} from 'react';

class Root extends React.Component {
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
        className = {className ? `bbCode-root ${className}` : "bbCode-root"}
        style = {style ? style : null}>
        {children}
      </span>
    );
  }
}

export default Root;
