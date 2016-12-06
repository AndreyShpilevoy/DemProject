import React, {PropTypes} from 'react';
import TermItem from 'containers/TermItem';
import styles from './index.scss';

class BbCode_OffTopic extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <div className = {styles.offtopicHeader}>
          <TermItem term={{id: 31, value: 'Offtopic:'}} />
        </div>
        <div className = {styles.offtopicContent}>
          {children}
        </div>
      </div>
    );
  }
}

export default BbCode_OffTopic;
