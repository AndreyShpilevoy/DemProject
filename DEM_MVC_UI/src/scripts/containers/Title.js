import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import root from "lodash/_root";
import _ from 'lodash';

class Title extends React.Component {
  static propTypes = {
    breadcrumbArray: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired
      })).isRequired
  };

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    let breadcrumbArray = nextProps.breadcrumbArray;
    if (breadcrumbArray !== this.props.breadcrumbArray) {
      let title = "";
      let orderedBreadcrumbs = this.orderBreadcrumbs(breadcrumbArray);
      for(let breadcrumb of orderedBreadcrumbs){
        title += `${title.length > 0 ? " >> " : ""}${breadcrumb.title}`;
      }
      root.document.title = title;
    }
  }

  orderBreadcrumbs = (breadcrumbArray) => {
    return  _.orderBy(breadcrumbArray, "level");
  }

  render(){
    return null;
  }
}

const mapStateToProps = (state) => ({
  breadcrumbArray: state.breadcrumbsReducer.breadcrumbs
});

export default connect(mapStateToProps)(Title);
