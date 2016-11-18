import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './index.scss';

class BreadcrumbItem extends React.Component {
  static propTypes = {
    setActive: PropTypes.bool.isRequired,
    ellipsis: PropTypes.bool,
    breadcrumbItem: PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    })
  };

  getbreadcrumbItem = () => {
    return this.props.ellipsis ?
      <div className={`${styles.breadcrumbItem} ${styles.breadcrumbItemIgnored}`}>
        <div className={styles.breadcrumbItemArrow}>{'...'}</div>
      </div> :
      <div className={this.props.setActive ? `${styles.breadcrumbItem} ${styles.breadcrumbItemActive}` : styles.breadcrumbItem}>
        <Link className={styles.breadcrumbItemArrow} to={this.props.breadcrumbItem.path}>
          <div>{this.props.breadcrumbItem.title}</div>
        </Link>
      </div>;
  }

  render(){
    return(this.getbreadcrumbItem());
  }
}

export default BreadcrumbItem;
