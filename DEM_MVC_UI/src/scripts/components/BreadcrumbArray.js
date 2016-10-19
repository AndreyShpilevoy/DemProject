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
        let setActive = false;
        if(index == orderedBreadcrumbs.length-1){
          setActive = true;
        }
        return <BreadcrumbItem key={breadcrumbItem.path} breadcrumbItem={breadcrumbItem} setActive={setActive}/>;
      }
    );
    return mappedBreadcrumbs;
  }

  render() {
    let mappedBreadcrumbArray = this.mapBreadcrumbs();
    return (
      <ul className="breadcrumb">
        {mappedBreadcrumbArray}
      </ul>
    );
  }
}

export default BreadcrumbArray;
