import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as lastActiveTopicActions from "../actions/lastActiveTopicActions";
import {LastActiveTopicsList as LastActiveTopicsListComponent} from "../components/_all";

class LastActiveTopicsList extends React.Component {
  static propTypes = {
    lastActiveTopics: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        postsCount: PropTypes.number.isRequired,
        topicViewsCount: PropTypes.number.isRequired,
        latesPostTimeCreation: PropTypes.instanceOf(Date),
        latesPostAutorId: PropTypes.number.isRequired,
        latesPostAutorName: PropTypes.string.isRequired,
        latesPostAutorAvatart: PropTypes.string.isRequired,
        latesPostAutorGroupColor: PropTypes.string.isRequired,
        parentForumId: PropTypes.number.isRequired,
        parentForumTitle: PropTypes.string.isRequired,
      })).isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getLastActiveTopics();
  }

  render(){
    return(
      <LastActiveTopicsListComponent lastActiveTopics={this.props.lastActiveTopics} />
    );
  }
}


const mapStateToProps = (state) => ({
  lastActiveTopics: state.lastActiveTopicReducer.lastActiveTopics
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(lastActiveTopicActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LastActiveTopicsList);
