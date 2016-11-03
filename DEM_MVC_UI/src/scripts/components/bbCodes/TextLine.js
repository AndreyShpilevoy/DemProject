import React, {PropTypes} from 'react';

class TextLine extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    addBreak: PropTypes.bool
  }

  addBreak = () => {
    return this.props.addBreak ?
    <br /> :
    null;
  }

  render() {
    const { children } = this.props;
    return (
      <span
        className = "bbCode-text-line">
        {children}
        {this.addBreak()}
      </span>
    );
  }
}

export default TextLine;
