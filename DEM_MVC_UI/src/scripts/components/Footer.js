import React from 'react';
import SocialMediaLinkArray from 'containers/SocialMediaLinkArray';

class Footer extends React.Component {
    render() {
    return(
      <div className="container footer-container">
        <div className="row">
          <div className="col-xs-12">
            <div id="footer" className="footer flex">
              <div className="hidden-md-down footer-empty-wrapper "/>
              <div className="footer-copyright-wrapper flex flex-column-vertical-center">
                {'DEM Team - 04.03.2007'}
              </div>
              <div className="hidden-md-down footer-social-media-link-wrapper flex flex-column-vertical-center">
                <SocialMediaLinkArray/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
