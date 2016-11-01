import React, {PropTypes} from 'react';

class Code extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    options: PropTypes.string
  }

  getAuthorNameFromOption = () => {
    return this.props.options ?
      <div className = "bbCode-code-author">
        this.props.options
      </div> :
      null;
  }

  render() {
    const { children } = this.props;
    return (
      <span
        className = "bbCode-code">
        {this.getAuthorNameFromOption()}
        {children}
      </span>
    );
  }
}

export default Code;
