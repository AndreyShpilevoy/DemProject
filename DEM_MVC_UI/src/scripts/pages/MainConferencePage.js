import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as lastActiveTopicActions from "../actions/lastActiveTopicActions";
import * as chapterActions from "../actions/chapterActions";
import * as breadcrumbsActions from "../actions/breadcrumbsActions";
import LastActiveTopicArray from "../components/LastActiveTopicArray";
import ChapterArray from "../components/ChapterArray";
import Breadcrumbs from "../containers/Breadcrumbs";


class MainConferencePage extends React.Component {
  static propTypes = {
    lastActiveTopics: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        postsCount: PropTypes.number.isRequired,
        topicViewsCount: PropTypes.number.isRequired,
        latesPostTimeCreation: PropTypes.instanceOf(Date),
        latesPostAutorId: PropTypes.number.isRequired,
        latesPostAutorName: PropTypes.string.isRequired,
        latesPostAutorAvatart: PropTypes.string.isRequired,
        latesPostAutorGroupColor: PropTypes.string.isRequired,
        parentForumId: PropTypes.number.isRequired,
        parentForumTitle: PropTypes.string.isRequired,
      })).isRequired,
    chapterArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
      })).isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getLastActiveTopics();
    this.props.actions.getAllChapters();
    this.props.actions.getConferenceBreadcrumbs();
  }

  render() {
    return (
      <div>
        <Breadcrumbs/>
        <LastActiveTopicArray lastActiveTopics={this.props.lastActiveTopics} />
        <ChapterArray chapterArray={this.props.chapterArray}/>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  lastActiveTopics: state.lastActiveTopicReducer.lastActiveTopics,
  chapterArray: state.chapterReducer.allChapters
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...lastActiveTopicActions,
      ...chapterActions,
      ...breadcrumbsActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainConferencePage);
