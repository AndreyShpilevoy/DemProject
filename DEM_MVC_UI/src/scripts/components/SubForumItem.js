import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import { RightAngle } from "../icons/_all";

class SubForumItem extends React.Component {
  static propTypes = {
    subForumItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired
    }).isRequired
  };

  render(){
    return(
      <div className="sub-forum-item-container flex flex-row">
        <RightAngle className="sub-forum-icon-right-angle" />
        <Link className="sub-forum-link" to={"/"}>{this.props.subForumItem.title}</Link>
      </div>
    );
  }
}

export default SubForumItem;