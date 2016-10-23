import React, {PropTypes} from 'react';
import _ from 'lodash';
import BreadcrumbItem from 'components/BreadcrumbItem';

class BreadcrumbArray extends React.Component {
  static propTypes = {
    breadcrumbArray: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired
      })).isRequired
  };

  mapBreadcrumbs = () => {
    let orderedBreadcrumbs = _.orderBy(this.props.breadcrumbArray, "level");
    //if Breadcrumbs more then 4 - cut middle of array;
    let withEllipsis = orderedBreadcrumbs.length > 4;
    let filteredBreadcrumb = orderedBreadcrumbs.filter(
      (item, index) => ((withEllipsis && index > 0 && index < orderedBreadcrumbs.length-3) ? false : true)
    );
    //map filtered array of Breadcrumbs
    let mappedBreadcrumbs = filteredBreadcrumb.map(
      (breadcrumbItem, index) => {
        let setActive = index == filteredBreadcrumb.length-1 ? true : false;
        return <BreadcrumbItem key={breadcrumbItem.path} breadcrumbItem={breadcrumbItem} setActive={setActive}/>;
      }
    );
    //if cut middle of Breadcrumbs array - add EllipsisArrow element;
    if (withEllipsis) {
      mappedBreadcrumbs.splice(1, 0, <div key="..." className="breadcrumb-item breadcrumb-item-ignored"><div className="breadcrumb-item-arrow">...</div></div>);
    }
    return mappedBreadcrumbs;
  }

  render() {
    let mappedBreadcrumbArray = this.mapBreadcrumbs();
    return (
      <div  className="breadcrumb">
        {mappedBreadcrumbArray}
      </div>
    );
  }
}

export default BreadcrumbArray;
