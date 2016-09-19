import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as termTranslationActions from "../actions/termTranslationActions";

class TermItem extends React.Component {
  static propTypes = {
    term: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    translatedTermItem: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if(this.props.term) {
      this.props.actions.getTermTranslation(this.props.term);
    }
  }

  render(){
    return(
      <span>{this.props.translatedTermItem}</span>
    );
  }
}


const mapStateToProps = (state) => {
  return {termItem: state.termTranslationReducer};
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(termTranslationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TermItem);
