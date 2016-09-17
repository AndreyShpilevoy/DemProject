import React, {PropTypes} from 'react';
import { Link } from 'react-router';

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
        <div className="forum-container row col-xs-12">
          <div className="col-md-5 col-lg-9 row">
            <div className="col-lg-8">
              <div>
                <Link className="" to={"/"}>{forumItem.title}</Link>
              </div>
              <div className="hidden-md-down">
                {forumItem.description}
              </div>
            </div>
            <div className="col-lg-2">
              <span className="hidden-lg-up">Topics </span>
              {forumItem.topicsCount}
            </div>
            <div className="col-lg-2">
              <span className="hidden-lg-up">Posts </span>
              {forumItem.postsCount}
            </div>
          </div>
          <div className="col-lg-3 row">
            <div className="col-md-4 col-lg-12">
              <Link className="" to={"/"}>{forumItem.lastActiveTopic}</Link>
            </div>
            <div className="hidden-sm-down col-md-3 col-lg-12">
              <Link className="" activeStyle={this.state.latesPostAutorNameStyle} to={"/"}>{forumItem.latesPostAutorName}</Link>
              {forumItem.latesPostTimeCreation.toString()}
            </div>
          </div>
        </div>
        <div className="forum-container-separator col-xs-12"/>
      </div>
    );
  }
}

export default ForumItem;
