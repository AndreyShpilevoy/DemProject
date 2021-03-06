import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import BreadcrumbArray from 'Organisms/BreadcrumbArray';

class Breadcrumbs extends React.Component {
  static propTypes = {
    breadcrumbArray: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired
      })).isRequired
  };

  render(){
    return <BreadcrumbArray breadcrumbArray={this.props.breadcrumbArray}/>;
  }
}

const mapStateToProps = (state) => ({
  breadcrumbArray: state.breadcrumbsReducer.breadcrumbArray ? state.breadcrumbsReducer.breadcrumbArray : []
});

export default connect(mapStateToProps)(Breadcrumbs);
