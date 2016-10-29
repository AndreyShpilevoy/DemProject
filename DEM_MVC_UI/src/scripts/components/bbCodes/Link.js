import React from 'react';

class Link extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    url: React.PropTypes.string,
  };

  render() {
    const { children, url } = this.props;
    return <a className="bbCode-link" href={url}>
      {children}
    </a>;
  }
}

export default Link;
