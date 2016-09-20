import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as localeActions from "../actions/localeActions";
import {TermItem as TermItemComponent} from "../components/_all.js";

class TermItem extends React.Component {
  static propTypes = {
      term: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
      locale: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getLocale();
  }

  render(){
    return(
      <TermItemComponent term={this.props.term} locale={this.props.locale}/>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.localeReducer.locale
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(localeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TermItem);
