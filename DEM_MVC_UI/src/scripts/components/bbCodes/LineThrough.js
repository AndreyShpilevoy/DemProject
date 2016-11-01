import React, {PropTypes} from 'react';

class LineThrough extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;
    return (
      <span
        className = "bbCode-line-through"
        style={{ textDecoration: 'line-through' }}>
        {children}
      </span>
    );
  }
}

export default LineThrough;
