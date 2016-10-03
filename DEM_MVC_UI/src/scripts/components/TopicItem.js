import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {TermItem, RelativeDateTime} from '../containers/_all';

class TopicItem extends React.Component {
  static propTypes = {
    topicItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      postsCount: PropTypes.number.isRequired,
      topicViewsCount: PropTypes.number.isRequired,
      latesPostTimeCreation: PropTypes.instanceOf(Date),
      latesPostAutorId: PropTypes.number.isRequired,
      latesPostAutorName: PropTypes.string.isRequired,
      latesPostAutorAvatart: PropTypes.string.isRequired,
      latesPostAutorGroupColor: PropTypes.string.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      latesPostAutorNameStyle: {
        color: `#${this.props.topicItem.latesPostAutorGroupColor}`
      }
    };
  }

  render(){
    let {title, postsCount, topicViewsCount, latesPostAutorName, latesPostTimeCreation, latesPostAutorAvatart} = this.props.topicItem;
    return(
      <div className="topic-container-wrapper row">
        <div>
          <Link to={`/`}>{title}</Link>
        </div>
        <div>
          <TermItem term={{id: 24, value: "Answer"}} />
          {postsCount}
        </div>
        <div>
          {topicViewsCount}
        </div>
        <div>
          <RelativeDateTime relativeDateTime={latesPostTimeCreation} spaceBefore/>
        </div>
        <div>
          <Link activeStyle={this.state.latesPostAutorNameStyle} to={"/"}>{latesPostAutorName}</Link>
        </div>
        <div>
          <img src={latesPostAutorAvatart} />
        </div>
      </div>
    );
  }
}

export default TopicItem;
