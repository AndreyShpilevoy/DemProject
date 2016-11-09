import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import TermItem from 'containers/TermItem';
import RelativeDateTime from 'containers/RelativeDateTime';

class TopicItem extends React.Component {
  static propTypes = {
    topicItem: PropTypes.shape({
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
      parentForumId: PropTypes.number,
      parentForumTitle: PropTypes.string,
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      latesPostAutorNameStyle: {
        color: `#${this.props.topicItem.lastPostInfo.latesPostAutorGroupColor}`
      }
    };
  }

  getUserAvatar = () => {
    return this.props.topicItem.lastPostInfo.latesPostAutorAvatart ?
      <Link className="topic-last-post-author-avatar" to={"/"}>
        <img src={this.props.topicItem.lastPostInfo.latesPostAutorAvatart} />
      </Link> :
      <div className="topic-last-post-author-avatar">
        <div className="topic-last-post-author-avatar-default"/>
      </div>;
  }

  getParentForum = () => {
    let {parentForumId, parentForumTitle} = this.props.topicItem;
    return (parentForumId || parentForumTitle) ?
    <span className="topic-parent-forum-wrapper">
      <TermItem className="topic-parent-forum" term={{id: 25, value: "Forum:"}} spaceAfter />
      <Link className="topic-parent-forum-title" to={`/Conference/Forum/${parentForumId}`}>{parentForumTitle}</Link>
    </span> :
    null;
  }

  render(){
    let {id, title, postsCount, topicViewsCount, lastPostInfo} = this.props.topicItem;
    return(
      <div className="topic-container-wrapper row">
        <div className="topic-container col-xs-12 row">
          <div className="col-md-5 col-lg-9 row">
            <div className="col-lg-8 flex flex-column-vertical-center topic-title-wrapper">
              <Link className="topic-title" to={`/Conference/Topic/${id}`}>{title}</Link>
              {this.getParentForum()}
            </div>
            <div className="col-lg-2 topic-posts-counter flex flex-column-vertical-center">
              <TermItem className="hidden-lg-up" term={{id: 2, value: "Posts"}} spaceAfter />
              {postsCount}
              {this.getParentForum()}
            </div>
            <div className="col-lg-2 topic-views-counter flex flex-column-vertical-center hidden-md-down">
              {topicViewsCount}
            </div>
          </div>
          <div className="col-md-7 col-lg-3 topic-last-post-wrapper">
            <div className="flex flex-row">
              <div className="topic-last-post-author">
                <RelativeDateTime className="topic-last-message-time" relativeDateTime={lastPostInfo.latesPostTimeCreation}/>
                <TermItem className="hidden-md-up topic-last-post-author-sm-separator" term={{id: 24, value: ">>"}} spaceAfter spaceBefore />
                <Link className="topic-last-post-autor-name-style" activeStyle={this.state.latesPostAutorNameStyle} to={"/"}>{lastPostInfo.latesPostAutorName}</Link>
              </div>
                <div className="topic-last-post-author-avatar-container flex flex-column-vertical-center hidden-md-down">
                  {this.getUserAvatar()}
                </div>
            </div>
          </div>
        </div>
        <div className="topic-container-separator col-xs-12"/>
      </div>
    );
  }
}

export default TopicItem;
