import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class UserAvatar extends React.Component {
  static propTypes = {
      id: PropTypes.number.isRequired,
      avatarUrl: PropTypes.string,
      style: PropTypes.object,
      className: PropTypes.string,
      size: PropTypes.number,
  };

  static defaultProps = {
    className: '',
    style: {}
  }

  getContainerStyles = () => {
    let {style, size} = this.props;
    return Object.assign({}, style, size ? {width: `${size}rem`} : {});
  };

  getImageStyles = () => {
    let {style, size} = this.props;
    return Object.assign({}, style, size ? {height: `${size}rem`} : {});
  };

  render(){
    let {avatarUrl} = this.props;
    return(
      <div className={`${styles.topicAuthorAvatarContainer} ${commonStyles.flexRowCenter}`} style={this.getContainerStyles()}>
        <Link className={styles.topicAuthorAvatar} to={'/'} activeStyle={this.getImageStyles()}>
          {avatarUrl ? <img src={avatarUrl} /> : <div className={styles.topicAuthorAvatarDefault}/>}
        </Link>
      </div>
    );
  }
}

export default UserAvatar;
