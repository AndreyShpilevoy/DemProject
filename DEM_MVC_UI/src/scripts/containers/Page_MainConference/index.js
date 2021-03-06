import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lastActiveTopicActions from 'actions/lastActiveTopicActions';
import * as chapterActions from 'actions/chapterActions';
import * as breadcrumbsActions from 'actions/breadcrumbsActions';
import LastActiveTopicArray from 'Organisms/LastActiveTopicArray';
import ChapterArray from 'Organisms/ChapterArray';
import Breadcrumbs from 'containers/Breadcrumbs';


class Page_MainConference extends React.Component {
  static propTypes = {
    lastActiveTopics: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        postsCount: PropTypes.number.isRequired,
        topicViewsCount: PropTypes.number.isRequired,
        lastPostInfo: PropTypes.shape({
          latesPostTimeCreation: PropTypes.instanceOf(Date),
          latesPostAutorId: PropTypes.number.isRequired,
          latesPostAutorName: PropTypes.string.isRequired,
          latesPostAutorAvatart: PropTypes.string,
          latesPostAutorGroupColor: PropTypes.string.isRequired
        }).isRequired,
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
        <Breadcrumbs/>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  lastActiveTopics: state.lastActiveTopicReducer.lastActiveTopics ? state.lastActiveTopicReducer.lastActiveTopics : [],
  chapterArray: state.chapterReducer.allChapters ? state.chapterReducer.allChapters : []
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...lastActiveTopicActions,
      ...chapterActions,
      ...breadcrumbsActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page_MainConference);
