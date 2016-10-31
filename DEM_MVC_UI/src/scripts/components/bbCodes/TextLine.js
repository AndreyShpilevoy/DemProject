import React from 'react';

class TextLine extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return <div className="bbCode-text-line">
      {this.props.children}
    </div>;
  }
}

export default TextLine;
