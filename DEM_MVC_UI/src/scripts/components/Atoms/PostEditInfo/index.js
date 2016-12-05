import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import LocaleDateTime from 'containers/LocaleDateTime';
import TermItem from 'containers/TermItem';

class PostEditInfo extends React.Component {
  static propTypes = {
      editInfo: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        userGroupColor: PropTypes.string.isRequired,
        editReason: PropTypes.string.isRequired,
        editCount: PropTypes.number.isRequired
      }).isRequired
  };

  render(){
    return(
        <div>
          <TermItem term={{id: 36, value: 'Last modified:'}} spaceAfter/>
          <Link to={'/'}>
            {this.props.editInfo.userName}
          </Link>
          <LocaleDateTime localeDateTime={new Date()} spaceBefore/>
        </div>
    );
  }
}

export default PostEditInfo;
