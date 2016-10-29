import React from 'react';

class Image extends React.Component {
  static propTypes = {
    label: React.PropTypes.string,
    url: React.PropTypes.string,
  };

  render() {
    const { label, url } = this.props;
    return <img alt={label} className="bbCode-image" src={url} />;
  }
}

export default Image;
