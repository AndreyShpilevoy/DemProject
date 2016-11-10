import React, {PropTypes} from 'react';
import { Link } from 'react-router';

class BreadcrumbItem extends React.Component {
  static propTypes = {
    breadcrumbItem: PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    }).isRequired,
    setActive: PropTypes.bool.isRequired
  };


  render(){
    return(
      <div className={this.props.setActive ? 'breadcrumb-item breadcrumb-item-active' : 'breadcrumb-item'}>
        <Link className="breadcrumb-item-arrow" to={this.props.breadcrumbItem.path}>
          <div>{this.props.breadcrumbItem.title}</div>
        </Link>
      </div>
    );
  }
}

export default BreadcrumbItem;
