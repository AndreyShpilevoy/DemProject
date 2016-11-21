import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {Row, Column, Hidden} from 'DemUi';
import UserName from 'Atoms/UserName';
import UserAvatar from 'Atoms/UserAvatar';
import Separator from 'Atoms/Separator';
import TermItem from 'containers/TermItem';
import RelativeDateTime from 'containers/RelativeDateTime';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class TopicItem extends React.Component {
  static propTypes = {
    topicItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      postsCount: PropTypes.number.isRequired,
      topicViewsCount: PropTypes.number.isRequired,
      lastPostInfo: PropTypes.shape({
        latesPostTimeCreation: PropTypes.instanceOf(Date),
        latesPostAutorId: PropTypes.number.isRequired,
        latesPostAutorName: PropTypes.string.isRequired,
        latesPostAutorAvatart: PropTypes.string,
        latesPostAutorGroupColor: PropTypes.string.isRequired
      }).isRequired,
      parentForumId: PropTypes.number,
      parentForumTitle: PropTypes.string,
    }).isRequired
  };

  getParentForum = () => {
    let {parentForumId, parentForumTitle} = this.props.topicItem;
    return (parentForumId || parentForumTitle) ?
    <span className={styles.topicParentForumWrapper}>
      <TermItem term={{id: 25, value: 'Forum:'}} spaceAfter />
      <Link className={styles.topicParentForumTitle} to={`/Conference/Forum/${parentForumId}`}>{parentForumTitle}</Link>
    </span> :
    null;
  }

  render(){
    let {id, title, postsCount, topicViewsCount, lastPostInfo} = this.props.topicItem;
    return(
      <div className={styles.topicContainerWrapper}>
        <Row>
          <Column xs={12}>
            <Row>
              <Column xs={12} md={7} lg={9} className={commonStyles.flexColumnVerticalCenter}>
                <Row className={commonStyles.flexRowVerticalCenter}>
                  <Column xs={12} lg={8} className={styles.topicMainInfoContainer}>
                    <Row>
                      <Column xs={12}>
                        <Link className={styles.topicTitle} to={`/Conference/Topic/${id}`}>{title}</Link>
                      </Column>
                    </Row>
                    <Row>
                      <Column xs={12} md={7} lg={12}>
                        {this.getParentForum()}
                      </Column>
                      <Column xs={0} mg={5} lg={0}>
                        <Hidden lg={'up'} sm={'down'}>
                          <TermItem term={{id: 2, value: 'Posts'}} spaceAfter />
                          {postsCount}
                        </Hidden>
                      </Column>
                    </Row>
                  </Column>
                  <Column xs={0} lg={2}  className={commonStyles.flexRowCenter}>
                    <Hidden md={'down'}>
                      {postsCount}
                    </Hidden>
                  </Column>
                  <Column xs={0} lg={2} className={commonStyles.flexRowCenter}>
                    <Hidden md={'down'}>
                      {topicViewsCount}
                    </Hidden>
                  </Column>
                </Row>
              </Column>
              <Column xs={12} md={5} lg={3}>
                <Row className={styles.lastPostInfoRow}>
                  <Column xs={12} lg={10} className={styles.lastPostInfoColumn}>
                    <RelativeDateTime className={styles.topicLastMessageTime}
                      relativeDateTime={lastPostInfo.latesPostTimeCreation} spaceAfter/>
                    <Hidden lg={'up'}>
                      <TermItem term={{id: 24, value: '>>'}} spaceAfter/>
                    </Hidden>
                    <UserName className={styles.topicLastPostAutorNameStyle}
                      name={lastPostInfo.latesPostAutorName}
                      id={lastPostInfo.latesPostAutorId}
                      color={lastPostInfo.latesPostAutorGroupColor}/>
                  </Column>
                  <Column xs={0} lg={2}>
                    <Hidden md={'down'} className={`${commonStyles.flexRowCenter} ${commonStyles.heigthFull}`}>
                      <UserAvatar id={lastPostInfo.latesPostAutorId} avatarUrl={lastPostInfo.latesPostAutorAvatart} size={2.5}/>
                    </Hidden>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Column>
        </Row>
        <Separator uniqueClassIdentifier={styles.topicSeparator}/>
      </div>
    );
  }
}

export default TopicItem;
