import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chapterActions from "../actions/chapterActions";
import * as topicActions from "../actions/topicActions";
import * as breadcrumbsActions from "../actions/breadcrumbsActions";
import ChapterItem from "../components/ChapterItem";
import TopicArray from "../components/TopicArray";
import Breadcrumbs from "../containers/Breadcrumbs";

class ViewForumPage extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      forumId: PropTypes.number.isRequired
    }).isRequired,
    chapterItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired,
    topicArray: PropTypes.arrayOf(
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
    locale: PropTypes.string.isRequired,
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
    if (nextProps.params.forumId !== this.props.params.forumId) {
      this.props.actions.getChapterById(nextProps.params.forumId);
      this.props.actions.getTopicsByForumId(nextProps.params.forumId);
      this.props.actions.getForumBreadcrumbs(this.props.params.forumId);
    }
  }

  render() {
    return (
      <div>
        <Breadcrumbs/>
        {this.props.chapterItem ? <ChapterItem chapterItem={this.props.chapterItem}/> :  null}
        <TopicArray topicArray={this.props.topicArray} forumId={this.props.params.forumId} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let result = {};
  let {chapterReducer, localeReducer, topicReducer} = state;
  if(chapterReducer && chapterReducer.chapterById){
    result = {chapterItem: chapterReducer.chapterById};
  }
  if(localeReducer && localeReducer.currentLocale && localeReducer.currentLocale.locale){
    result = Object.assign({}, result, {locale: localeReducer.currentLocale.locale});
  }
  if(topicReducer && topicReducer.allTopics){
    let allTopicsFiltered = topicReducer.allTopics.find(topicReducer => topicReducer.forumId === ownProps.params.forumId);
    result = Object.assign(
      {},
      result,
      {topicArray: allTopicsFiltered ? allTopicsFiltered.topicArray : null});
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
