import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chapterActions from "../actions/chapterActions";
//import { ChaptersPage as ChaptersPageComponent } from "../components/_all";

class ChapterByIdItem extends React.Component {
  static propTypes = {
    chapter: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.getChapterById(this.props.params.id);
  }

  render() {
    return (
      <div>{this.props.chapter ? this.props.chapter.title : null}</div>
    );
  }

}

const mapStateToProps = (state) => {
  let result = {};
  if(state.chapterReducer && state.chapterReducer.chapterById){
    result = {chapter: state.chapterReducer.chapterById};
  }
  return result;
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(chapterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterByIdItem);
