import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as breadcrumbsActions from "actions/breadcrumbsActions";
import * as postActions from "actions/postActions";
import Breadcrumbs from "containers/Breadcrumbs";
import PostArray from "components/PostArray";

class ViewTopicPage extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      topicId: PropTypes.number.isRequired
    }).isRequired,
    postArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        postTime: PropTypes.instanceOf(Date).isRequired,
        subject: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        userInfo: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string,
          rank: PropTypes.string.isRequired,
          groupColor: PropTypes.string.isRequired
        }).isRequired,
        editInfo: PropTypes.shape({
          userId: PropTypes.number.isRequired,
          userName: PropTypes.string.isRequired,
          userGroupColor: PropTypes.string.isRequired,
          editReason: PropTypes.string.isRequired,
          editCount: PropTypes.number.isRequired
        }),
        signature: PropTypes.string
      }).isRequired
    ).isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getTopicBreadcrumbs(this.props.params.topicId);
    this.props.actions.getPostsByTopicId(this.props.params.topicId);
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    let topicId = nextProps.params.topicId;
    if (topicId !== this.props.params.topicId) {
      this.props.actions.getTopicBreadcrumbs(topicId);
    }
  }

  render() {
    return (
      <div>
        <Breadcrumbs/>
        <PostArray postArray={this.props.postArray} topicId={this.props.params.topicId}/>
        <Breadcrumbs/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let result = {};
  let {postReducer} = state;
  if(postReducer && postReducer.allPosts){
    let allPostsFiltered = postReducer.allPosts.find(postReducer => postReducer.topicId === ownProps.params.topicId);
    result = Object.assign(
      {},
      result,
      {postArray: allPostsFiltered ? allPostsFiltered.postArray : null});
  }
  return result;
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...breadcrumbsActions,
      ...postActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTopicPage);
