import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as forumActions from "../../actions/forumActions.js";

class ManageeForumPage extends React.Component {
    constructor(props, context){
      super(props, context);
    }
    render() {
        return (
          <h1>ManageeForumPage</h1>
        );
    }
}

ManageeForumPage.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
      state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(forumActions, dispatch)
    };
}

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(ManageeForumPage);
