import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as socialMediaLinkActions from "../actions/socialMediaLinkActions";
import {SocialMediaLinkList as  SocialMediaLinkListComponent} from '../components/_all';

class SocialMediaLinkList extends React.Component {
  static propTypes = {
    sociaMediaLinkList: PropTypes.arrayOf(
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
      <SocialMediaLinkListComponent sociaMediaLinkList={this.props.sociaMediaLinkList} />
    );
  }
}

const mapStateToProps = (state) => ({
  sociaMediaLinkList: state.socialMediaLinkReducer.socialMediaLinks
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(socialMediaLinkActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaLinkList);
