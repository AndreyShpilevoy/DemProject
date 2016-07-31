import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as forumActions from "../../actions/forumActions";
import * as authorActions from "../../actions/authorActions";
import ForumForm from "./presentation/ForumForm";

class ManageeForumPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            forum: Object.assign({}, this.props.forum),
            errors: {}
        };
    }

    componentDidMount() {
        this.props.actions.getAllAuthors();
    }

    authorFormattedForDropdown() {
        let authorFormattedForDropdown = this.props.authors.map(author => {
            return {
                value: author.id,
                text: author.firstName + " " + author.lastName
            };
        });
        return authorFormattedForDropdown;
    }

    render() {
        return (
          <ForumForm
            forum={this.state.forum}
            allAuthors={this.authorFormattedForDropdown()}
            errors={this.state.errors}/>
        );
    }
}

ManageeForumPage.propTypes = {
    forum: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    let forum = {
        id: "",
        watchHref: "",
        title: "",
        authorId: "",
        length: "",
        category: ""
    };

    return {forum: forum, authors: state.authorReducer};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, forumActions, authorActions), dispatch)
    };
}

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(ManageeForumPage);
