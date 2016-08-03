import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as forumActions from "../../actions/forumActions";
import * as authorActions from "../../actions/authorActions";
import ForumForm from "./presentation/ForumForm";

class ManageForumPage extends React.Component {
  static propTypes = {
    forum: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

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

  authorFormattedForDropdown = () => {
    let authorFormattedForDropdown = this.props.authors.map(author => {
      return {
        value: author.id,
        text: `${author.firstName}  ${author.lastName}`
      };
    });
    return authorFormattedForDropdown;
  }

  updateForumState = (event) => {
    const field = event.target.name;
    let forum = this.state.forum;
    forum[field] = event.target.value;
    return this.setState({forum: forum});
  }

  render() {
    return (
      <ForumForm
        forum={this.state.forum}
        allAuthors={this.authorFormattedForDropdown()}
        onChange = {this.updateForumState}
        errors={this.state.errors}/>
    );
  }
}

const mapStateToProps = (state) => ({//, ownProps) => ({
  forum: {id: "", watchHref: "", title: "", authorId: "", length: "", category: ""},
  authors: state.authorReducer
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, forumActions, authorActions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageForumPage);
