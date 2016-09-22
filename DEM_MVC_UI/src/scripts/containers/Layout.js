import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as localeActions from "../actions/localeActions";
import {Layout as LayoutComponent} from "../components/_all";

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getLocale();
  }

  render(){
    return(
      <LayoutComponent children={this.props.children}/>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.localeReducer.locale
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(localeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
