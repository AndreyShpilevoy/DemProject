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
    <span className="topic-parent-forum-wrapper">
      <TermItem className="topic-parent-forum" term={{id: 25, value: 'Forum:'}} spaceAfter />
      <Link className="topic-parent-forum-title" to={`/Conference/Forum/${parentForumId}`}>{parentForumTitle}</Link>
    </span> :
    null;
  }

  render(){
    let {id, title, postsCount, topicViewsCount, lastPostInfo} = this.props.topicItem;
    return(
      <div className="topicContainerWrapper">
        <Row className="topic-container">
          <Column xs={12}>
            <Row>
              <Column md={5} lg={9} className={commonStyles.flexColumnVerticalCenter}>
                <Row className={commonStyles.flexRowVerticalCenter}>
                  <Column lg={8}>
                    <Row>
                      <Column xs={12}>
                        <Link className="topicTitle" to={`/Conference/Topic/${id}`}>{title}</Link>
                      </Column>
                    </Row>
                    <Row>
                      <Column xs={12}>
                        {this.getParentForum()}
                      </Column>
                    </Row>
                  </Column>
                  <Column lg={2}  className={`${commonStyles.flexRowCenter} topic-posts-counter`}>
                    <Hidden lg={'up'}>
                      <TermItem term={{id: 2, value: 'Posts'}} spaceAfter />
                    </Hidden>
                    {postsCount}
                  </Column>
                  <Column lg={2} className={commonStyles.flexRowCenter}>
                    <Hidden md={'down'} className="topic-views-counter">
                      {topicViewsCount}
                    </Hidden>
                  </Column>
                </Row>
              </Column>
              <Column md={7} lg={3} className="topic-last-post-wrapper">
                <Row>
                  <Column xs={12} lg={10} className={`topic-last-post-author ${commonStyles.flexColumnCenter}`}>
                    <RelativeDateTime className="topic-last-message-time" relativeDateTime={lastPostInfo.latesPostTimeCreation}/>
                    <Hidden md={'up'}>
                      <TermItem className="topic-last-post-author-sm-separator"
                        term={{id: 24, value: '>>'}} spaceAfter spaceBefore />
                    </Hidden>
                    <UserName className="topic-last-post-autor-name-style"
                      name={lastPostInfo.latesPostAutorName}
                      id={lastPostInfo.latesPostAutorId}
                      color={lastPostInfo.latesPostAutorGroupColor}/>
                  </Column>
                  <Column lg={2}>
                    <Hidden md={'down'} className={commonStyles.flexRowCenter}>
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
