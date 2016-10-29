import React from 'react';

class Paragraph extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return <p className="bbCode-paragraph">
      {this.props.children}
    </p>;
  }
}

export default Paragraph;
