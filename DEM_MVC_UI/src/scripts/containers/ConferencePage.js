import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chapterActions from "../actions/chapterActions";
import { ConferencePage as ConferencePageComponent } from "../components/_all.js";

class ConferencePage extends React.Component {
	static propTypes = {
    chapters: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

	componentDidMount() {
		this.props.actions.getAllChapters();
	}

  render() {
    return (
      <ConferencePageComponent chapters={this.props.chapters}/>
    );
  }

}

const mapStateToProps = (state) => ({
  chapters: state.chapterReducer
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(chapterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
