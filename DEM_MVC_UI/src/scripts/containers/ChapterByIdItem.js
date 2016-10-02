import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chapterActions from "../actions/chapterActions";
import { ChapterItem } from "../components/_all";
import { TopicList } from "./_all";

class ChapterByIdItem extends React.Component {
  static propTypes = {
    chapterItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      chapterId: PropTypes.number.isRequired,
    }).isRequired,
    actions: PropTypes.object.isRequired,
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getChapterById(this.props.params.chapterId);
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    let nextChapterId = nextProps.params.chapterId;
    if (nextChapterId !== this.props.params.chapterId) {
        this.props.actions.getChapterById(nextChapterId);
    }
  }

  render() {
    return (
        this.props.chapterItem ?
          <div>
            <ChapterItem chapterItem={this.props.chapterItem}/>
            <TopicList forumId={this.props.chapterItem.id}/>
          </div> :
          null
    );
  }

}

const mapStateToProps = (state) => {
  let result = {};
  if(state.chapterReducer && state.chapterReducer.chapterById){
    result = {chapterItem: state.chapterReducer.chapterById};
  }
  return result;
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(chapterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterByIdItem);
