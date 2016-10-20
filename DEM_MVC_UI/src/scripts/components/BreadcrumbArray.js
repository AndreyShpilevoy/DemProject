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
        let setActive = index == orderedBreadcrumbs.length-1 ? true : false;
        return <BreadcrumbItem key={breadcrumbItem.path} breadcrumbItem={breadcrumbItem} setActive={setActive}/>;
      }
    );
    return mappedBreadcrumbs;
  }

  render() {
    let mappedBreadcrumbArray = this.mapBreadcrumbs();
    return (
      <div  className="breadcrumb-container">
        <ul className="breadcrumb">
          {mappedBreadcrumbArray}
        </ul>
      </div>
    );
  }
}

export default BreadcrumbArray;
