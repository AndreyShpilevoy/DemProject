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

  getUserAvatar = () => {
    return this.props.topicItem.latesPostAutorAvatart ?
    <div className="topic-last-post-author-avatar-container">
      <Link to={"/"}>
        <img src={this.props.topicItem.latesPostAutorAvatart} />
      </Link>
    </div> :
    null;
  }

  render(){
    let {title, postsCount, topicViewsCount, latesPostAutorName, latesPostTimeCreation} = this.props.topicItem;
    return(
      <div className="topic-container-wrapper row">
        <div className="topic-container col-xs-12 row">
          <div className="col-md-5 col-lg-9 row">
            <div className="topic-title col-lg-8 flex flex-column-vertical-center">
              <Link to={`/`}>{title}</Link>
            </div>
            <div className="col-lg-2 topic-posts-counter flex flex-column-vertical-center">
              <TermItem className="hidden-lg-up" term={{id: 2, value: "Posts"}} spaceAfter />
              {postsCount}
            </div>
            <div className="col-lg-2 topic-views-counter flex flex-column-vertical-center">
              {topicViewsCount}
            </div>
          </div>
          <div className="col-md-7 col-lg-3 topic-last-post-wrapper">
            <div className="flex flex-row">
              <div className="flex flex-column-vertical-center">
                <Link activeStyle={this.state.latesPostAutorNameStyle} to={"/"}>{latesPostAutorName}</Link>
              </div>
              {this.getUserAvatar()}
            </div>
            <div>
              <RelativeDateTime relativeDateTime={latesPostTimeCreation} spaceBefore/>
            </div>
          </div>
        </div>
        <div className="topic-container-separator col-xs-12"/>
      </div>
    );
  }
}

export default TopicItem;
