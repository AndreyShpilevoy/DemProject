import React, {PropTypes} from 'react';
import _ from 'lodash';
//import {TopicItem} from './_all';

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
      })).isRequired
  };

  sortTopics = () => {
    return  _.sortBy(this.props.topicList, "latesPostTimeCreation");
  }

  mapTopics = () => {
    let mappedTopics = this.sortTopics().map(topicItem =>
      //<TopicItem key={topicItem.id} topicItem={topicItem} />);
      <div key={topicItem.id}>{topicItem.title}</div>);
        return mappedTopics;
  }

  render(){
    let topicItems = this.mapTopics();
    return(
      <div className="topics-container">
        {topicItems}
      </div>
    );
  }
}

export default TopicList;
