import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as topicActions from "../actions/topicActions";
import {TopicList as TopicListComponent} from "../components/_all";

class TopicList extends React.Component {
  static propTypes = {
    forumId: PropTypes.number.isRequired,
    topicList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        postsCount: PropTypes.number.isRequired,
        topicViewsCount: PropTypes.number.isRequired,
        latesPostTimeCreation: PropTypes.instanceOf(Date),
        latesPostAutorId: PropTypes.number.isRequired,
        latesPostAutorName: PropTypes.string.isRequired,
        latesPostAutorAvatart: PropTypes.string.isRequired,
        latesPostAutorGroupColor: PropTypes.string.isRequired
      })).isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getTopicsByForumId(this.props.forumId);
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    let nextForumId = nextProps.forumId;
    if (nextForumId !== this.props.forumId) {
        this.props.actions.getTopicsByForumId(nextForumId);
    }
  }

  render(){
    return(
      <TopicListComponent topicList={this.props.topicList} forumId={this.props.forumId} />
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let result;
  if(state.topicReducer && state.topicReducer.allTopics){
    result = state.topicReducer.allTopics.find(topicReducer => topicReducer.forumId === ownProps.forumId);
  }
  return {
    topicList: result ? result.topicList : []
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(topicActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);