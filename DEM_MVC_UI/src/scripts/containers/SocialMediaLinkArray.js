import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as socialMediaLinkActions from 'actions/socialMediaLinkActions';
import SocialMediaLinkArrayComponent from 'Organisms/SocialMediaLinkArray';

class SocialMediaLinkArray extends React.Component {
  static propTypes = {
    socialMediaLinkArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        svgName: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
      })).isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getSocialMediaLinks();
  }

  render(){
    return(
      <SocialMediaLinkArrayComponent socialMediaLinkArray={this.props.socialMediaLinkArray} />
    );
  }
}

const mapStateToProps = (state) => ({
  socialMediaLinkArray: state.socialMediaLinkReducer.socialMediaLinks ? state.socialMediaLinkReducer.socialMediaLinks : []
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(socialMediaLinkActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaLinkArray);
