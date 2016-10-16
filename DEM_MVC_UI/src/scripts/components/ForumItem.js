import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import RelativeDateTime from '../containers/RelativeDateTime';
import TermItem from '../containers/TermItem';
import SubForumArray from './SubForumArray';

class ForumItem extends React.Component {
  static propTypes = {
    forumItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      order: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      topicsCount: PropTypes.number.isRequired,
      postsCount: PropTypes.number.isRequired,
      lastActiveTopicId: PropTypes.number.isRequired,
      lastActiveTopic: PropTypes.string.isRequired,
      latesPostTimeCreation: PropTypes.instanceOf(Date),
      latesPostAutorId: PropTypes.number.isRequired,
      latesPostAutorName: PropTypes.string.isRequired,
      latesPostAutorGroupColor: PropTypes.string.isRequired,
      subForumArray: PropTypes.array
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      latesPostAutorNameStyle: {
        color: `#${this.props.forumItem.latesPostAutorGroupColor}`
      }
    };
  }

  render(){
    let {id, title, description, subForumArray, topicsCount, postsCount,
      latesPostAutorName, latesPostTimeCreation, lastActiveTopic,
      lastActiveTopicId} = this.props.forumItem;
    return(
      <div className="forum-container-wrapper row">
        <div className="forum-container col-xs-12 row">
          <div className="col-md-5 col-lg-9 row">
            <div className="col-lg-8 flex flex-column-vertical-center">
              <Link  className="forum-title" to={`/Conference/Forum/${id}`}>{title}</Link>
              <div className="hidden-md-down forum-description">
                {description}
              </div>
              <div className="hidden-md-down">
                <SubForumArray subForumArray={subForumArray}/>
              </div>
            </div>
            <div className="col-lg-2 forum-topics-counter flex flex-column-vertical-center">
              <span className="hidden-lg-up">
                <TermItem term={{id: 1, value: "Topics"}} spaceAfter/>
              </span>
              {topicsCount}
            </div>
            <div className="col-lg-2 forum-posts-counter flex flex-column-vertical-center">
              <span className="hidden-lg-up">
                <TermItem term={{id: 2, value: "Posts"}} spaceAfter/>
              </span>
              {postsCount}
            </div>
          </div>
          <div className="col-md-7 col-lg-3 forum-last-post-wrapper">
            <div className="hidden-sm-down padding-initial forum-last-post-autor-name-style">
              <Link className="hidden-sm-down" activeStyle={this.state.latesPostAutorNameStyle} to={"/"}>{latesPostAutorName}</Link>
              <RelativeDateTime relativeDateTime={latesPostTimeCreation} spaceBefore/>
            </div>
            <div className="padding-initial forum-last-active-topic">
              <span className="hidden-lg-up">
                <TermItem term={{id: 3, value: "Last message in"}} spaceAfter/>
              </span>
              <Link className="forum-last-active-topic-message" to={`/Conference/Topic/${lastActiveTopicId}`}>{lastActiveTopic}</Link>
            </div>
          </div>
        </div>
        <div className="forum-container-separator col-xs-12"/>
      </div>
    );
  }
}

export default ForumItem;
