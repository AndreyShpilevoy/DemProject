import React, {PropTypes} from 'react';
import _ from 'lodash';
import CollapsibleWrapper from "./CollapsibleWrapper";
import TopicItem from "./TopicItem";
import TermItem from '../containers/TermItem';

class LastActiveTopicsList extends React.Component {
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
    forumId: PropTypes.number.isRequired
  };

  orderLastActiveTopics = () => {
    return  _.orderBy(this.props.lastActiveTopics, "latesPostTimeCreation", "desc");
  }

  mapLastActiveTopics = () => {
    let mappedTopics = this.orderLastActiveTopics().map(lastActiveTopicsItem =>
      <TopicItem key={lastActiveTopicsItem.id} topicItem={lastActiveTopicsItem} />);
        return mappedTopics;
  }

  bindCollapsibleWrapperItem = () =>({
    uniquePrefix: `last-topic-list`,
    titleElement: <TermItem term={{id: 26, value: "Last messages"}} />,
    bodyElement: <div className="topics-container container">{this.mapLastActiveTopics()}</div>,
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

export default LastActiveTopicsList;
