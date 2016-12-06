import React, {PropTypes} from 'react';
import styles from './index.scss';

class BbCode_Think extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;
    return (
      <div className = {styles.think}>
        <span className = {styles.thinkContent}>
          {children}
        </span>
        <div className = {styles.thinkImage}/>
      </div>
    );
  }
}

export default BbCode_Think;
