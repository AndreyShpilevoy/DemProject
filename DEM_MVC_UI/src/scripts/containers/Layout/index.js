import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from 'actions/localeActions';
import LayoutComponent from 'Templates/Layout';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getLocale();
  }

  render(){
    return(
      <LayoutComponent children={this.props.children}/>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(localeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
