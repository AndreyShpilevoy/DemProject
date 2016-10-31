import React, { PropTypes } from 'react';
import Icons from "components/icons/_index";

class SocialMediaLinkItem extends React.Component {
  static propTypes = {
    sociaMediaLinkItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      svgName: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired
    }).isRequired
  };

  render(){
    let {svgName, href, title, id} = this.props.sociaMediaLinkItem;
    let Icon = Icons[svgName];
    return Icon ?
      <div className="social-media-link">
        <a href={href} title={title} target="_blank">
          <Icon id={id} title={title} className={`social-media-link-${svgName}`}/>
        </a>
      </div>:
    null;
  }
}

export default SocialMediaLinkItem;
