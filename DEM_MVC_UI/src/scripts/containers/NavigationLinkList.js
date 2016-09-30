import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationLinkActions from "../actions/navigationLinkActions";
import { NavigationLinkList as NavigationLinkListComponent } from "../components/_all";

export class NavigationLinkList extends React.Component {
  static propTypes = {
    navigationLinkList: PropTypes.arrayOf(
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
      <NavigationLinkListComponent navigationLinkList={this.props.navigationLinkList}/>
    );
  }
}


const mapStateToProps = (state) => ({
  navigationLinkList: state.navigationLinkReducer.navigationLinks
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(navigationLinkActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationLinkList);
