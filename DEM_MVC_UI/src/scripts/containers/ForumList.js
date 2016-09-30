import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as forumActions from "../actions/forumActions";
import {ForumList as ForumListComponent} from "../components/_all";

export class ForumList extends React.Component {
  static propTypes = {
    chapterId: PropTypes.number.isRequired,
    forumList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        order: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        topicsCount: PropTypes.number.isRequired,
        postsCount: PropTypes.number.isRequired,
        lastActiveTopicId: PropTypes.number.isRequired,
        lastActiveTopic: PropTypes.string.isRequired,
        latesPostTimeCreation: PropTypes.instanceOf(Date),
        latesPostAutorId: PropTypes.number.isRequired,
        latesPostAutorName: PropTypes.string.isRequired,
        latesPostAutorGroupColor: PropTypes.string.isRequired,
        subForumList: PropTypes.array,
      })).isRequired,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getForumsByChapterId(this.props.chapterId);
  }

  render(){
    return(
      <ForumListComponent forumList={this.props.forumList} />
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let result;
  if(state.forumReducer && state.forumReducer.allForums){
    result = state.forumReducer.allForums.find(forumReducer => forumReducer.chapterId === ownProps.chapterId);
  }
  return {
    forumList: result ? result.forumList : []
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(forumActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForumList);
