import React, {PropTypes} from 'react';

class OrderedList extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    const { children } = this.props;
    return (
      <ol
        className = 'bbCode-ordered-list'>
        {children}
      </ol>
    );
  }
}

export default OrderedList;
