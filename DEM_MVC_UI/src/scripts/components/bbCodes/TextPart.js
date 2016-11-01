import React, {PropTypes} from 'react';

class TextPart extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;
    return (
      <span
        className = "bbCode-text-part">
        {children}
      </span>
    );
  }
}

export default TextPart;
