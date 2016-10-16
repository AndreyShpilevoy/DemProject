import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as localeActions from "../actions/localeActions";
import * as titleActions from "../actions/titleActions";
import LayoutComponent from "../components/Layout";
import TermTranslation from "../utils/TermTranslation";

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getLocale();
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    if(nextProps.locale){
      let titleMainPart = TermTranslation.getTermTranslation({id: 27, value: "DeusExMachina"}, nextProps.locale);
      this.props.actions.setTitleMainPart(titleMainPart);
    }
  }

  /* istanbul ignore next */
  componentWillUnmount(){
    this.props.actions.setTitleMainPart();
  }

  render(){
    return(
      <LayoutComponent children={this.props.children}/>
    );
  }
}

const mapStateToProps = (state) => {
  let result = {};
  if(state.localeReducer &&
    state.localeReducer.currentLocale &&
    state.localeReducer.currentLocale.locale){
    result = {locale: state.localeReducer.currentLocale.locale};
  }
  return result;
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...localeActions, ...titleActions}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
