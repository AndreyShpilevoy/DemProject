import React from 'react';

class Quote extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }
  render() {
    const { children } = this.props;
    return <blockquote className="bbCode-quote">
      {children}
    </blockquote>;
  }
}

export default Quote;
