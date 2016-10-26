import React, {PropTypes} from 'react';
import _ from 'lodash';
import ContentHolder from "components/ContentHolder";
import PostItem from "components/PostItem";
import TermItem from 'containers/TermItem';

class PostArray extends React.Component {
  static propTypes = {
    postArray: PropTypes.arrayOf(
      PropTypes.shape({
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
    ).isRequired,
    topicId: PropTypes.number.isRequired
  };

  orderPosts = () => {
    return  _.orderBy(this.props.postArray, "postTime", "desc");
  }

  mapPosts = () => {
    let mappedPosts = this.orderPosts().map(postItem =>
      <PostItem key={postItem.id} postItem={postItem}/>);
        return mappedPosts;
  }

  bindContentHolderItem = () =>({
    uniquePrefix: `post-array-with-topic-id-${this.props.topicId}`,
    titleElement: <TermItem term={{id: 30, value: "Posts"}} />,
    bodyElement: <div className="posts-container container">{this.mapPosts()}</div>
  })

  collapseSettings = () => ({
    collapsable: false,
    openedByDefault: true
  })

  render(){
    return(
      <ContentHolder contentHolderItem={this.bindContentHolderItem()} collapseSettings={this.collapseSettings()} />
    );
  }
}

export default PostArray;
