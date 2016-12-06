import React, {PropTypes} from 'react';
import styles from './index.scss';

class BbCode_Root extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { children } = this.props;

    return (
      <span
        className = {styles.root}>
        {children}
      </span>
    );
  }
}

export default BbCode_Root;
