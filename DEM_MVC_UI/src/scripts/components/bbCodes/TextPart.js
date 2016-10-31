import React from 'react';

class TextPart extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return <span className="bbCode-text-part">
      {this.props.children}
    </span>;
  }
}

export default TextPart;
