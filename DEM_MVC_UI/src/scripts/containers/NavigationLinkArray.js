import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as navigationLinkActions from 'actions/navigationLinkActions';
import NavigationLinkArrayComponent from 'components/NavigationLinkArray';

class NavigationLinkArray extends React.Component {
  static propTypes = {
    navigationLinkArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
      })).isRequired,
    actions: PropTypes.object.isRequired,
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getNavigationLinks();
  }

  render(){
    const {navigationLinkArray} = this.props;
    return(
      <NavigationLinkArrayComponent navigationLinkArray={navigationLinkArray}/>
    );
  }
}


const mapStateToProps = (state) => ({
  navigationLinkArray: state.navigationLinkReducer.navigationLinks ? state.navigationLinkReducer.navigationLinks : []
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(navigationLinkActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationLinkArray);
