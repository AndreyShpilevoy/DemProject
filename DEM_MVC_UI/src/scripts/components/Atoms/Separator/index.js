import React, {PropTypes} from 'react';
import styles from './index.scss';

class Separator extends React.Component {
  static propTypes = {
    uniqueClassIdentifier: PropTypes.string
  }
  render(){
    return <div className={`${styles.separator} ${this.props.uniqueClassIdentifier}`}/>;
  }
}

export default Separator;
