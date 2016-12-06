import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {Row, Column, Hidden} from 'dem-ui-grid';
import UserName from 'Atoms/UserName';
import Separator from 'Atoms/Separator';
import RelativeDateTime from 'containers/RelativeDateTime';
import TermItem from 'containers/TermItem';
import SubForumArray from 'Organisms/SubForumArray';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class ForumItem extends React.Component {
  static propTypes = {
    forumItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      order: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      topicsCount: PropTypes.number.isRequired,
      postsCount: PropTypes.number.isRequired,
      lastTopicInfo: PropTypes.shape({
        lastActiveTopicId: PropTypes.number.isRequired,
        lastActiveTopic: PropTypes.string.isRequired,
        latesPostTimeCreation: PropTypes.instanceOf(Date),
        latesPostAutorId: PropTypes.number.isRequired,
        latesPostAutorName: PropTypes.string.isRequired,
        latesPostAutorGroupColor: PropTypes.string.isRequired,
      }).isRequired,
      subForumArray: PropTypes.array
    }).isRequired
  };

  getSubForumArray = () => {
    return this.props.forumItem.subForumArray ?
      <SubForumArray subForumArray={this.props.forumItem.subForumArray}/> :
      null;
  }

  render(){
    let {id, title, description, topicsCount, postsCount, lastTopicInfo} = this.props.forumItem;
    return(
      <div className={styles.forumContainerWrapper}>
        <Row>
          <Column xs={12} md={5} lg={9}>
            <Row>
              <Column xs={12} lg={8} className={commonStyles.flexColumnVerticalCenter}>
                <Link  className={styles.forumTitle} to={`/Conference/Forum/${id}`}>
                  {title}
                </Link>
                <Hidden md={'down'} className={styles.forumDescription}>
                  {description}
                </Hidden>
                <Hidden md={'down'}>
                  {this.getSubForumArray()}
                </Hidden>
              </Column>
              <Column lg={2} className={`${styles.forumTopicsCounter} ${commonStyles.flexColumnVerticalCenter}`}>
                <Hidden lg={'up'} style={{display: 'inline-block'}}>
                  <TermItem term={{id: 1, value: 'Topics'}} spaceAfter/>
                </Hidden>
                {topicsCount}
              </Column>
              <Column lg={2} className={`${styles.forumPostsCounter} ${commonStyles.flexColumnVerticalCenter}`}>
                <Hidden lg={'up'} style={{display: 'inline-block'}}>
                  <TermItem term={{id: 2, value: 'Posts'}} spaceAfter/>
                </Hidden>
                {postsCount}
              </Column>
            </Row>
          </Column>
          <Column xs={12} md={7} lg={3} className={styles.forumLastPostWrapper}>
            <Hidden sm={'down'} className={styles.forumLastPostAutorNameStyle}>
              <Hidden md={'down'} style={{display: 'inline-block'}}>
                <UserName name={lastTopicInfo.latesPostAutorName}
                  color={lastTopicInfo.latesPostAutorGroupColor} id={lastTopicInfo.latesPostAutorId}/>
              </Hidden>
              <RelativeDateTime relativeDateTime={lastTopicInfo.latesPostTimeCreation} spaceBefore/>
            </Hidden>
            <div className={styles.forumLastActiveTopic}>
              <Hidden lg={'up'} style={{display: 'inline-block'}}>
                <TermItem term={{id: 3, value: 'Last message in'}} spaceAfter/>
              </Hidden>
              <Link className={styles.forumLastActiveTopicMessage} to={`/Conference/Topic/${lastTopicInfo.lastActiveTopicId}`}>
                {lastTopicInfo.lastActiveTopic}
              </Link>
            </div>
          </Column>
        </Row>
        <Separator uniqueClassIdentifier={styles.forumSeparator}/>
      </div>
    );
  }
}

export default ForumItem;
