import React, {PropTypes} from 'react';
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
// import * as navigationLinkActions from "../actions/navigationLinkActions";
import { ChapterItem as ChapterItemComponent } from "../components/_all";

class ChapterItem extends React.Component {
  static propTypes = {
    chapterItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired
  };

  // componentDidMount() {
  //   this.props.actions.getNavigationLinks();
  // }

  render(){
    return(
      <ChapterItemComponent chapterItem={this.props.chapterItem}/>
    );
  }
}


// const mapStateToProps = (state) => ({
//   navigationLinks: state.navigationLinkReducer
// });
//
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(navigationLinkActions, dispatch)
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
export default ChapterItem;
