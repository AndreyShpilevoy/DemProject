import React, {PropTypes} from 'react';

class Image extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  render() {
    const { url } = this.props;
    return (
      <img
        alt={url}
        className = "bbCode-image"
        src={url} />
    );
  }
}

export default Image;
