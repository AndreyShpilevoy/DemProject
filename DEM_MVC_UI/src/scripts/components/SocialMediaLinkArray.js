import React, { PropTypes } from 'react';
import _ from 'lodash';
import SocialMediaLinkItem from "components/SocialMediaLinkItem";

class SocialMediaLinkArray extends React.Component {
  static propTypes = {
    socialMediaLinkArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        svgName: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
      })).isRequired
  };

  orderSocialMediaLinks = () => {
    return  _.orderBy(this.props.socialMediaLinkArray, "order");
  }

  mapSocialMediaLinks = () => {
    let mappedSocialMediaLinks = this.orderSocialMediaLinks().map(sociaMediaLinkItem =>
      <SocialMediaLinkItem key={sociaMediaLinkItem.id} sociaMediaLinkItem = {sociaMediaLinkItem} />);
    return mappedSocialMediaLinks;
  }

  render() {
    let socialMediaLinks = this.mapSocialMediaLinks();
    return (
      <div className="flex social-media-link-wrapper">
        {socialMediaLinks}
      </div>
    );
  }
}

export default SocialMediaLinkArray;
