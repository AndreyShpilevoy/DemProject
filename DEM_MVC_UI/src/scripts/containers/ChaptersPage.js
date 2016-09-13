import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chapterActions from "../actions/chapterActions";
import { ChaptersPage as ChaptersPageComponent } from "../components/_all.js";

class ChaptersPage extends React.Component {
	static propTypes = {
    chapters: PropTypes.arrayOf(
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
      <ChaptersPageComponent chapters={this.props.chapters}/>
    );
  }

}

const mapStateToProps = (state) => ({
  chapters: state.chapterReducer
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(chapterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChaptersPage);
