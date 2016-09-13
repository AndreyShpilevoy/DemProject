import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationLinkActions from "../actions/navigationLinkActions";
import { NavigationLinks as NavigationLinksComponent } from "../components/_all";

class NavigationLinks extends React.Component {
  static propTypes = {
    navigationLinks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
      })).isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.getNavigationLinks();
  }

  render(){
    return(
      <NavigationLinksComponent navigationLinks={this.props.navigationLinks}/>
    );
  }
}


const mapStateToProps = (state) => ({
  navigationLinks: state.navigationLinkReducer
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(navigationLinkActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationLinks);
