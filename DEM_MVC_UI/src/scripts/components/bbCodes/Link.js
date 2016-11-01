import React, {PropTypes} from 'react';

class Link extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    attributes: PropTypes.shape({
      url: PropTypes.string,
      className: PropTypes.string,
      style: PropTypes.object,
    })
  };

  render() {
    const { children } = this.props;
    const { url, className, style } = this.props.attributes;
    return (
      <a
        className = {className ? `bbCode-link ${className}` : "bbCode-link"}
        style = {style ? style : null}
        href={url}>
        {children}
      </a>
    );
  }
}

export default Link;
