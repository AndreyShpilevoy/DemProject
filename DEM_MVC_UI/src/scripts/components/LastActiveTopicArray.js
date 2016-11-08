import React, {PropTypes} from 'react';
import _ from 'lodash';
import ContentHolder from "components/ContentHolder";
import TopicItem from "components/TopicItem";
import TermItem from 'containers/TermItem';

class LastActiveTopicArray extends React.Component {
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
      })).isRequired
  };

  orderLastActiveTopics = () => {
    return  _.orderBy(this.props.lastActiveTopics, "latesPostTimeCreation", "desc");
  }

  mapLastActiveTopics = () => {
    let mappedTopics = this.orderLastActiveTopics().map(lastActiveTopicsItem =>
      <TopicItem key={lastActiveTopicsItem.id} topicItem={lastActiveTopicsItem} />);
        return mappedTopics;
  }

  bindContentHolderItem = () =>({
    uniquePrefix: `last-topic-array`,
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
      <ContentHolder contentHolderItem={this.bindContentHolderItem()} collapseSettings={this.collapseSettings()} />
    );
  }
}

export default LastActiveTopicArray;
