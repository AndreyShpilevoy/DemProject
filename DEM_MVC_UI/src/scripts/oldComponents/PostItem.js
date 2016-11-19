import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import LocaleDateTime from 'containers/LocaleDateTime';
import TermItem from 'containers/TermItem';
import BbCodePresenter from 'bbCodes/BbCodePresenter';

class PostItem extends React.Component {
  static propTypes = {
    postItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      postTime: PropTypes.instanceOf(Date).isRequired,
      subject: PropTypes.string,
      message: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      userInfo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        groupColor: PropTypes.string.isRequired
      }).isRequired,
      editInfo: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        userGroupColor: PropTypes.string.isRequired,
        editReason: PropTypes.string.isRequired,
        editCount: PropTypes.number.isRequired
      }),
      signature: PropTypes.string
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      userNameStyle: {
        color: this.props.postItem.userInfo.groupColor
      }
    };
  }

  getUserAvatar = () => {
    return this.props.postItem.userInfo.avatar ?
      <Link className="post-avatar" to={'/'}>
        <img src={this.props.postItem.userInfo.avatar} />
      </Link> :
      <div className="post-avatar">
        <div className="post-avatar-default"/>
      </div>;
  }

  getEditInfo = () => {
    let {editInfo} = this.props.postItem;
    return editInfo ?
      <div>
        <TermItem term={{id: -1, value: 'Последний раз отредактировано'}} spaceAfter/>
        <Link to={'/'}>
          {editInfo.userName}
        </Link>
        <LocaleDateTime localeDateTime={new Date()} spaceBefore/>
      </div> :
      null;
  }

  render(){
    let {userInfo, postTime, subject, message} = this.props.postItem;
    return(
      <div className="post-container-wrapper row">
        <div className="flex flex-row-vertical-center">
          <div className="post-avatar-container">
            {this.getUserAvatar()}
          </div>
          <Link className="post-user-name" activeStyle={this.state.userNameStyle} to={'/'}>
            {userInfo.name}
          </Link>
          <div className="post-time">
            <LocaleDateTime localeDateTime={postTime}/>
          </div>
          <div className="post-subject">
            {subject}
          </div>
        </div>
        <div className="post-message">
          <BbCodePresenter text={message} />
          {this.getEditInfo()}
        </div>
        <div className="post-container-separator col-xs-12"/>
      </div>
    );
  }
}

export default PostItem;
