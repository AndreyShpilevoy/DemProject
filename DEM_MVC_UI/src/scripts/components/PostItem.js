import React, {PropTypes} from 'react';
// import { Link } from 'react-router';
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

  render(){
    return(
      <div>
        {this.props.postItem.id}
      </div>
    );
  }
}

export default PostItem;
