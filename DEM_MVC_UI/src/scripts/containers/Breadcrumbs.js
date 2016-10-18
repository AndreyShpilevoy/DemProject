import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import root from "lodash/_root";
//import SocialMediaLinkArrayComponent from '../components/SocialMediaLinkArray';

class Breadcrumbs extends React.Component {
  static propTypes = {
    breadcrumbsArray: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired
      })).isRequired
  };

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    if (nextProps.breadcrumbsArray !== this.props.breadcrumbsArray) {
      root.document.title = "Test" + nextProps.breadcrumbsArray.length;
    }
  }

  render(){
    return null;
  }
}

const mapStateToProps = (state) => ({
  breadcrumbsArray: state.breadcrumbsReducer.breadcrumbs
});

export default connect(mapStateToProps)(Breadcrumbs);
