import React from 'react';
import { Link } from 'react-router';
import styles from './index.scss';

class Logotype extends React.Component {
  render(){
    return (
      <Link to="/">
        <div className={styles.logo}/>
      </Link>
    );
  }
}

export default Logotype;
