import React, { PropTypes } from 'react';
import * as Icons from 'Molecules/SvgImages';
import styles from './index.scss';

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
    let IconsVariable = Icons;
    let Icon = IconsVariable[svgName];
    return Icon ?
      <div className={styles.socialMediaLink}>
        <a href={href} title={title} target="_blank">
          <Icon id={`social-media-link-id-${id}`} title={title}/>
        </a>
      </div>:
    null;
  }
}

export default SocialMediaLinkItem;
