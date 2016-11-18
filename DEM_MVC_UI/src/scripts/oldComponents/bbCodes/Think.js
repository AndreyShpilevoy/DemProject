import React, {PropTypes} from 'react';

class Think extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;
    return (
      <div className = "bbCode-think">
        <span className = "bbCode-think-content">
          {children}
        </span>
        <div className = "bbCode-think-image"/>
      </div>
    );
  }
}

export default Think;
