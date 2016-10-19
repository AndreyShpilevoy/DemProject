import React, {PropTypes} from 'react';
import _ from 'lodash';
import BreadcrumbItem from './BreadcrumbItem';

class BreadcrumbArray extends React.Component {
  static propTypes = {
    breadcrumbArray: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired
      })).isRequired
  };

  orderBreadcrumbs = () => {
    return  _.orderBy(this.props.breadcrumbArray, "level");
  }

  mapBreadcrumbs = () => {
    let orderedBreadcrumbs = this.orderBreadcrumbs();
    let mappedBreadcrumbs = orderedBreadcrumbs.map(
      (breadcrumbItem, index) => {
        let setSeparator = true;
        if(index == orderedBreadcrumbs.length-1){
          setSeparator = false;
        }
        return <BreadcrumbItem key={breadcrumbItem.path} breadcrumbItem={breadcrumbItem} setSeparator={setSeparator}/>;
      }
    );
    return mappedBreadcrumbs;
  }

  render() {
    let mappedBreadcrumbArray = this.mapBreadcrumbs();
    return (
      <div>
        {mappedBreadcrumbArray}
      </div>
    );
  }
}

export default BreadcrumbArray;
