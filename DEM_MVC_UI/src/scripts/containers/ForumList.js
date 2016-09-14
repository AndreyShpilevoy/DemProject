import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as forumActions from "../actions/forumActions";

class ForumList extends React.Component {
  // static propTypes = {
  //   navigationLinks: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       id: PropTypes.number.isRequired,
  //       title: PropTypes.string.isRequired,
  //       href: PropTypes.string.isRequired,
  //       order: PropTypes.number.isRequired,
  //     })).isRequired,
  //   actions: PropTypes.object.isRequired,
  // };
  static propTypes = {
    chapterId: PropTypes.number.isRequired,
    forumsContainer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getAllForums(this.props.chapterId);
  }

  render(){
    return(
      <div>forums {this.props.forumsContainer.forums.length}  {this.props.chapterId}</div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let forumsContainer = state.forumReducer.find(forumReducer => forumReducer.chapterId === ownProps.chapterId);
  return {
    forumsContainer: forumsContainer ? forumsContainer : {forums:[]}
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(forumActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForumList);
