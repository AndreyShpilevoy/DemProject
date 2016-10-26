import React, {PropTypes} from 'react';
import { Link } from 'react-router';
// import TermItem from 'containers/TermItem';
// import RelativeDateTime from 'containers/RelativeDateTime';

class PostItem extends React.Component {
  static propTypes = {
    postItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      postTime: PropTypes.instanceOf(Date).isRequired,
      subject: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      userInfo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        rank: PropTypes.string.isRequired,
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
        color: `#${this.props.postItem.userInfo.groupColor}`
      }
    };
  }

  getUserAvatar = () => {
    return this.props.postItem.userInfo.avatar ?
      <Link className="post-avatar" to={"/"}>
        <img src={this.props.postItem.userInfo.avatar} />
      </Link> :
      <div className="post-avatar"/>;
  }

  render(){
    let {userInfo} = this.props.postItem;
    return(
      <div className="post-container-wrapper row">
        <div className="post-avatar-container flex flex-column-vertical-center">
          {this.getUserAvatar()}
        </div>
        <Link className="post-autor-name-style" activeStyle={this.state.userNameStyle} to={"/"}>{userInfo.name}</Link>
        <div className="post-container-separator col-xs-12"/>
      </div>
    );
  }
}

export default PostItem;
