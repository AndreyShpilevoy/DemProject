import React, {PropTypes} from 'react';
import TermItem from 'containers/TermItem';

class OffTopic extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;
    return (
      <div className = "bbCode-offtopic">
        <div className = "bbCode-offtopic-header">
          <TermItem term={{id: 31, value: 'Offtopic:'}} />
        </div>
        <div className = "bbCode-offtopic-content">
          {children}
        </div>
      </div>
    );
  }
}

export default OffTopic;
