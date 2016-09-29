import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chapterActions from "../actions/chapterActions";
import { ChapterList as ChapterListComponent } from "../components/_all";

class ChapterList extends React.Component {
  static propTypes = {
    chapterList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
      })).isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.getAllChapters();
  }

  render() {
    return (
      <ChapterListComponent chapterList={this.props.chapterList}/>
    );
  }

}

const mapStateToProps = (state) => ({
  chapterList: state.chapterReducer.allChapters
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(chapterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList);
