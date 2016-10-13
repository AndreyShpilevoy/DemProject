import React, {PropTypes} from 'react';
import _ from 'lodash';
import CollapsibleWrapper from "./CollapsibleWrapper";
import TopicItem from "./TopicItem";
import TermItem from '../containers/TermItem';

class TopicList extends React.Component {
  static propTypes = {
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
    forumId: PropTypes.number.isRequired
  };

  orderTopics = () => {
    return  _.orderBy(this.props.topicList, "latesPostTimeCreation", "desc");
  }

  mapTopics = () => {
    let mappedTopics = this.orderTopics().map(topicItem =>
      <TopicItem key={topicItem.id} topicItem={topicItem} />);
        return mappedTopics;
  }

  bindCollapsibleWrapperItem = () =>({
    uniquePrefix: `topic-list-with-forum-id-${this.props.forumId}`,
    titleElement: <TermItem term={{id: 23, value: "Topics"}} />,
    bodyElement: <div className="topics-container container">{this.mapTopics()}</div>,
    firstColumnTerm: <TermItem term={{id: 2, value: "Posts"}} />,
    secondColumnTerm:<TermItem term={{id: 22, value: "Views"}} />,
    thirdColumnTerm: <TermItem term={{id: 3, value: "Last message in"}} />
  })

  collapseSettings = () => ({
    collapsable: true,
    openedByDefault: true
  })

  render(){
    return(
      <CollapsibleWrapper collapsibleWrapperItem={this.bindCollapsibleWrapperItem()} collapseSettings={this.collapseSettings()} />
    );
  }
}

export default TopicList;
