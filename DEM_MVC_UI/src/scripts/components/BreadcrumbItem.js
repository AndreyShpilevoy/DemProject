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
      <li className={this.props.setActive ? "breadcrumb-item active" : "breadcrumb-item"}>
        <Link to={this.props.breadcrumbItem.path}>
          {this.props.breadcrumbItem.title}
        </Link>
      </li>
    );
  }
}

export default BreadcrumbItem;
