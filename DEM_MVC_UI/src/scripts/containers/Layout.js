//Context ussed here!
import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as localeActions from "../actions/localeActions";
import {Layout as LayoutComponent} from "../components/_all";
import {ReduxContextFix} from "../utils/_all";

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  static childContextTypes = {
    locale: React.PropTypes.string
  }

  constructor(props, context) {
    super(props, context);
    ReduxContextFix.register(this);
  }

  getChildContext() {
    return {locale: this.props.locale};
  }

  componentWillMount() {
    this.props.actions.getLocale();
  }

  render(){
    return(
      <LayoutComponent children={this.props.children}/>
    );
  }
}

const mapStateToProps = (state) => {
  let newLocale = {locale: state.localeReducer.locale};
  ReduxContextFix.notify(newLocale);
  return newLocale;
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(localeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
