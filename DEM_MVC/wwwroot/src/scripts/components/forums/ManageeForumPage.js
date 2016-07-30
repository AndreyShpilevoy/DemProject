import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as forumActions from "../../actions/forumActions";
import ForumForm from "./presentation/ForumForm";

class ManageeForumPage extends React.Component {
    constructor(props, context){
      super(props, context);

      this.state = {
        forum: Object.assign({}, this.props.forum),
        errors: {}
      };
    }

    render() {
        return (
          <ForumForm
            forum={this.state.forum}
            allAuthors={[]}
            errors={this.state.errors}/>
        );
    }
}

ManageeForumPage.propTypes = {
    forum: PropTypes.object.isRequired
};

function mapStateToProps(){//state) {
    let forum = {id: "", watchHref: "", title: "", authorId: "", length: "", category: ""};
    return {
      forum: forum
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(forumActions, dispatch)
    };
}

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(ManageeForumPage);
