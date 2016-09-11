import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as forumActions from "../actions/forumActions";
import { ForumList } from "../components/_all";

class ForumsPage extends React.Component {
  static propTypes = {
    forums: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.getAllForums();
  }

  render() {
    const {forums} = this.props;

    return (
      <div>
        <h2>Test ForumsPage</h2>
        <ForumList forums={forums}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({//, ownProps) => ({
  forums: state.forumReducer
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(forumActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForumsPage);
