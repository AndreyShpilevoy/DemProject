import React, { PropTypes } from 'react';
import _ from 'lodash';
import SocialMediaLinkItem from "./SocialMediaLinkItem";

class SocialMediaLinkList extends React.Component {
  static propTypes = {
    socialMediaLinkList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        svgName: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
      })).isRequired,
    actions: PropTypes.object.isRequired
  };

  orderSocialMediaLinks = () => {
    return  _.orderBy(this.props.socialMediaLinkList, "order");
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

export default SocialMediaLinkList;
