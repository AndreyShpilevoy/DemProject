import React, {PropTypes} from 'react';

class Code extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    options: PropTypes.string
  }

  getHeaderFromOption = () => {
    return this.props.options ?
      <div className = "bbCode-code-header">
        {this.props.options}:
      </div> :
      null;
  }

  render() {
    const { children } = this.props;
    return (
      <div
        className = "bbCode-code">
        {this.getHeaderFromOption()}
        <span
          className = "bbCode-code-content">
          {children}
        </span>
      </div>
    );
  }
}

export default Code;
