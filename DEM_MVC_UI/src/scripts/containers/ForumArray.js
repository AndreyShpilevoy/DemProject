import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as forumActions from 'actions/forumActions';
import ForumArrayComponent from 'oldComponents/ForumArray';

class ForumArray extends React.Component {
  static propTypes = {
    chapterId: PropTypes.number.isRequired,
    forumArray: PropTypes.arrayOf(
      PropTypes.shape({
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
        subForumArray: PropTypes.array,
      })).isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getForumsByChapterId(this.props.chapterId);
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    let nextChapterId = nextProps.chapterId;
    if (nextChapterId !== this.props.chapterId) {
        this.props.actions.getForumsByChapterId(nextChapterId);
    }
  }

  render(){
    return(
      <ForumArrayComponent forumArray={this.props.forumArray} />
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let result;
  if(state.forumReducer && state.forumReducer.allForums){
    result = state.forumReducer.allForums.find(forumReducer => forumReducer.chapterId === ownProps.chapterId);
  }
  return {
    forumArray: result ? result.forumArray : []
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(forumActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForumArray);
