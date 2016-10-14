import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chapterActions from "../actions/chapterActions";
import ChapterArrayComponent from "../components/ChapterArray";

class ChapterArray extends React.Component {
  static propTypes = {
    chapterArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
      })).isRequired,
    actions: PropTypes.object.isRequired,
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getAllChapters();
  }

  render() {
    return (
      <ChapterArrayComponent chapterArray={this.props.chapterArray}/>
    );
  }

}

const mapStateToProps = (state) => ({
  chapterArray: state.chapterReducer.allChapters
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(chapterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterArray);
