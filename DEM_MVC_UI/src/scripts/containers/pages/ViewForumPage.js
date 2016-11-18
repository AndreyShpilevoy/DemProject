import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as chapterActions from 'actions/chapterActions';
import * as topicActions from 'actions/topicActions';
import * as breadcrumbsActions from 'actions/breadcrumbsActions';
import ChapterItem from 'Molecules/ChapterItem';
import TopicArray from 'Organisms/TopicArray';
import Breadcrumbs from 'containers/Breadcrumbs';

class ViewForumPage extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      forumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired,
    chapterItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }),
    topicArray: PropTypes.arrayOf(
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
        }).isRequired
      })),
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getChapterById(this.props.params.forumId);
    this.props.actions.getTopicsByForumId(this.props.params.forumId);
    this.props.actions.getForumBreadcrumbs(this.props.params.forumId);
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    let forumId = nextProps.params.forumId;
    if (forumId !== this.props.params.forumId) {
      this.props.actions.getChapterById(forumId);
      this.props.actions.getTopicsByForumId(forumId);
      this.props.actions.getForumBreadcrumbs(forumId);
    }
  }

  render() {
    return (
      <div>
        <Breadcrumbs/>
        {this.props.chapterItem ? <ChapterItem chapterItem={this.props.chapterItem}/> :  null}
        {this.props.topicArray ? <TopicArray topicArray={this.props.topicArray} forumId={this.props.params.forumId} /> :  null}
        <Breadcrumbs/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let {chapterReducer, topicReducer} = state;
  let result = {
    chapterItem: null,
    topicArray: []
  };

  if(chapterReducer){
    result = Object.assign({}, result, {chapterItem: chapterReducer.chapterById});
  }

  if(topicReducer && topicReducer.allTopics){
    let allTopicsFiltered = topicReducer.allTopics.find(topicReducer => topicReducer.forumId === ownProps.params.forumId);
    result = Object.assign({}, result, {topicArray: allTopicsFiltered ? allTopicsFiltered.topicArray : []});
  }
  return result;
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...chapterActions,
      ...topicActions,
      ...breadcrumbsActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewForumPage);
