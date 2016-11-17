import React from 'react';
import {Container, Row, Column, Hidden} from 'DemUi';
import SocialMediaLinkArray from 'containers/SocialMediaLinkArray';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class Footer extends React.Component {
    render() {
    return(
      <Container>
        <Row>
          <Column xs={12}>
            <div id="footer" className={`${styles.footer} ${commonStyles.flex}`}>
              <Hidden md={'down'} className={styles.footerEmptyWrapper}/>
              <div className={`${styles.footerCopyrightWrapper} ${commonStyles.flexColumnVerticalCenter}`}>
                {'DEM Team - 04.03.2007'}
              </div>
              <Hidden md={'down'} className={`${styles.footerSocialMediaLinkWrapper} ${commonStyles.flexColumnVerticalCenter}`}>
                <SocialMediaLinkArray/>
              </Hidden>
            </div>
          </Column>
        </Row>
      </Container>
    );
  }
}

export default Footer;
