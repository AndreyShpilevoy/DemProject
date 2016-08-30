import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationLinkActions from "../../actions/navigationLinkActions";
import Header from "../common/presentation/Header";

class Layout  extends React.Component {
  static propTypes = {
    navigationLinks: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.actions.getNavigationLinks();
  }

  render(){
    return (
      <div>
        <Header navigationLinks = {this.props.navigationLinks} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  navigationLinks: state.navigationLinkReducer
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(navigationLinkActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
