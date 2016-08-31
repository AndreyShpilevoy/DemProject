import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationLinkActions from "../../actions/navigationLinkActions";
import NavigationLinksLayout from "./presentation/navigation/NavigationLinksLayout";

class NavigationLinks extends React.Component {
  static propTypes = {
    navigationLinks: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.getNavigationLinks();
  }

  render(){
    return(
      <NavigationLinksLayout navigationLinks={this.props.navigationLinks}/>
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
