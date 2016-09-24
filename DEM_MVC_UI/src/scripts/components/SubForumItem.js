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
      <div className="sub-forum-item-container">
        <RightAngle className="icon-arrow-left" />
        <Link to={"/"}>{this.props.subForumItem.title}</Link>
      </div>
    );
  }
}

export default SubForumItem;
