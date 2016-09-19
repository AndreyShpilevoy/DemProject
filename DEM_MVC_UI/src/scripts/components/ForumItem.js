import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {TermItem} from '../containers/_all.js';

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
      subforums: PropTypes.array
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
    let forumItem = this.props.forumItem;
    return(
      <div className="forum-container-wrapper row">
        <div className="forum-container col-xs-12 row">
          <div className="col-md-5 col-lg-9 row">
            <div className="col-lg-8 flex flex-column-vertical-center">
              <div className="forum-title">
                <Link to={"/"}>{forumItem.title}</Link>
              </div>
              <div className="hidden-md-down forum-description">
                {forumItem.description}
              </div>
            </div>
            <div className="col-lg-2 forum-topics-counter flex flex-column-vertical-center">
              <span className="hidden-lg-up">
                <TermItem termItem={{key: 1, value: "Topics"}}/> 
              </span>
              {forumItem.topicsCount}
            </div>
            <div className="col-lg-2 forum-posts-counter flex flex-column-vertical-center">
              <span className="hidden-lg-up">Posts </span>
              {forumItem.postsCount}
            </div>
          </div>
          <div className="col-md-7 col-lg-3 row">
            <div className="hidden-sm-down col-md-5 col-lg-12">
              <Link activeStyle={this.state.latesPostAutorNameStyle} to={"/"}>{forumItem.latesPostAutorName}</Link>
              {forumItem.latesPostTimeCreation.toString()}
            </div>
            <div className="col-md-7 col-lg-12 forum-last-active-topic">
              <span className="hidden-lg-up">Last message in </span>
              <Link className="forum-last-active-topic-message" to={"/"}>{forumItem.lastActiveTopic}</Link>
            </div>
          </div>
        </div>
        <div className="forum-container-separator col-xs-12"/>
      </div>
    );
  }
}

export default ForumItem;
