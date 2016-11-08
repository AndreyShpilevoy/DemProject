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

  state = {title: ""};

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    let breadcrumbArray = nextProps.breadcrumbArray;
    if (breadcrumbArray !== this.props.breadcrumbArray) {
      let title = "DeusExMachina";
      let orderedBreadcrumbs =  _.orderBy(breadcrumbArray, "level");
      if(orderedBreadcrumbs.length >= 1){
        title += ` • ${orderedBreadcrumbs[orderedBreadcrumbs.length-1].title}`;
      }
      this.setState({title: title});
    }
  }

  render(){
    root.document.title = this.state.title;
    return null;
  }
}

const mapStateToProps = (state) => ({
  breadcrumbArray: state.breadcrumbsReducer.breadcrumbArray ? state.breadcrumbsReducer.breadcrumbArray : []
});

export default connect(mapStateToProps)(Title);
