import React, {PropTypes} from 'react';
import { Link } from 'react-router';

class BreadcrumbItem extends React.Component {
  static propTypes = {
    breadcrumbItem: PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    }).isRequired,
    setSeparator: PropTypes.bool.isRequired
  };


  render(){
    return(
      <span>
        <Link to={this.props.breadcrumbItem.path}>
          {this.props.breadcrumbItem.title}
        </Link>
        {this.props.setSeparator ? " >> " : ""}
      </span>
    );
  }
}

export default BreadcrumbItem;
