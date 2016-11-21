import React, {PropTypes} from 'react';
import _ from 'lodash';
import ContentHolder from 'Organisms/ContentHolder';
import TopicItem from 'Molecules/TopicItem';
import TermItem from 'containers/TermItem';

class TopicArray extends React.Component {
  static propTypes = {
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
      })).isRequired,
    forumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };

  orderTopics = () => {
    return  _.orderBy(this.props.topicArray, 'latesPostTimeCreation', 'desc');
  }

  mapTopics = () => {
    let mappedTopics = this.orderTopics().map(topicItem =>
      <TopicItem key={topicItem.id} topicItem={topicItem} />);
        return mappedTopics;
  }

  bindContentHolderItem = () =>({
    uniquePrefix: `topic-array-with-forum-id-${this.props.forumId}`,
    titleElement: <TermItem term={{id: 23, value: 'Topics'}} />,
    bodyElement: this.mapTopics(),
    firstColumnTerm: <TermItem term={{id: 2, value: 'Posts'}} />,
    secondColumnTerm:<TermItem term={{id: 22, value: 'Views'}} />,
    thirdColumnTerm: <TermItem term={{id: 3, value: 'Last message in'}} />
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

export default TopicArray;
