import React, {PropTypes} from 'react';
import styles from './index.scss';

class ContentHolderBody extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  render(){
    return (
        <div className={styles.contentHolderBody}>
          {this.props.children}
        </div>
    );
  }
}

export default ContentHolderBody;
