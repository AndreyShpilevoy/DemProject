import React, {PropTypes} from 'react';

class Link extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  render() {
    const { url, children } = this.props;
    return (
      <a
        className = "bbCode-link"
        href={url}
        target="_blank">
        {children}
      </a>
    );
  }
}

export default Link;
