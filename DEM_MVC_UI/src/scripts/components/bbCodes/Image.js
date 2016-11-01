import React, {PropTypes} from 'react';

class Image extends React.Component {
  static propTypes = {
    attributes: PropTypes.shape({
      className: PropTypes.string,
      style: PropTypes.object,
      label: PropTypes.string,
      url: PropTypes.string,
    })
  };

  render() {
    const { label, url, className, style } = this.props.attributes;
    return <img
      alt={label}
      className={className ? `bbCode-image ${className}` : "bbCode-image"}
      style={style ? style : null}
      src={url} />;
  }
}

export default Image;
