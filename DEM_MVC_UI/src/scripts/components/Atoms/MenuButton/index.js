import React, {PropTypes} from 'react';
import styles from './index.scss';

class MenuButton extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render(){
    return(
      <button type='button' className={styles.menuButton} id={this.props.id}>
        <span className={styles.menuButtonLine}/>
        <span className={styles.menuButtonLine}/>
        <span className={styles.menuButtonLine}/>
      </button>
    );
  }
}

export default MenuButton;
