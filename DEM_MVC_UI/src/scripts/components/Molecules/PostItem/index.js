import React, {PropTypes} from 'react';
import {Row} from 'dem-ui-grid';
import UserAvatar from 'Atoms/UserAvatar';
import UserName from 'Atoms/UserName';
import PostEditInfo from 'Atoms/PostEditInfo';
import Separator from 'Atoms/Separator';
import LocaleDateTime from 'containers/LocaleDateTime';
import BbCodePresenter from 'Molecules/BbCodePresenter';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

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

  render(){
    let {userInfo, postTime, subject, message, editInfo} = this.props.postItem;
    return(
      <div className={styles.postContainerWrapper}>
        <Row>
          <div className={commonStyles.flexRowVerticalCenter}>
            <UserAvatar id={userInfo.id} avatarUrl={userInfo.avatar} size={3}/>
            <UserName className={styles.postUserName}
              name={userInfo.name}
              id={userInfo.id}
              color={userInfo.groupColor}/>
            <div className={styles.postTime}>
              <LocaleDateTime localeDateTime={postTime}/>
            </div>
            <div className={styles.postsubject}>
              {subject}
            </div>
          </div>
          <div className={styles.postMessage}>
            <BbCodePresenter text={message} />
            {editInfo ? <PostEditInfo editInfo={editInfo}/> : null}
          </div>
        </Row>
        <Separator uniqueClassIdentifier={styles.postSeparator}/>
      </div>
    );
  }
}

export default PostItem;
