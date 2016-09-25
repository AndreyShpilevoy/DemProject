import React, { PropTypes } from 'react';
import * as Icons from "../icons/_all";

const SocialMediaLinkItem = ({sociaMediaLinkItem}) => {
  let IconComponentArray = Icons;
  let Icon = IconComponentArray[sociaMediaLinkItem.svgName];
  return (
    <div className="social-media-link">
      <a href={sociaMediaLinkItem.href} title={sociaMediaLinkItem.title} target="_blank">
        {Icon ? <Icon id={sociaMediaLinkItem.id}
                      title={sociaMediaLinkItem.title}
                      className={`social-media-link-${sociaMediaLinkItem.svgName}`}/>: null}
      </a>
    </div>
  );
};

SocialMediaLinkItem.propTypes = {
  sociaMediaLinkItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    svgName: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired
  }).isRequired
};

export default SocialMediaLinkItem;
