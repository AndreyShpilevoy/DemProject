import React, {PropTypes} from 'react';

class BbCode_TextLine extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    const { children } = this.props;
    return (
      <span
        className = 'bbCode-text-line'>
        {children}
      </span>
    );
  }
}

export default BbCode_TextLine;
