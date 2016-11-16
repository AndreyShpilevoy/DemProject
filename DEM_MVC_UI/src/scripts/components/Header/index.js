import React from 'react';
import {Container, Row, Column} from 'Grid';
import NavigationLinkArray from 'containers/NavigationLinkArray';
import MenuButton from 'components/MenuButton';
import Logotype from 'components/Logotype';
import ToggleClass from 'services/domScripts/ToggleClass';
import ShrinkingHeader from 'services/domScripts/ShrinkingHeader';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class Header extends React.Component {
  state = {
    navigationMenuButtonId: 'navigationMenuToggleButton',
    navigationMenuContentId: 'navigationMenuContent',
    navigationMenuLinksOpenedClassName: styles.NavigationMenuLinksOpened,
    navigationMenuLinksDefaultClassName: styles.NavigationMenuLinksDefault
  }

  componentDidMount() {
    const {navigationMenuButtonId, navigationMenuContentId, navigationMenuLinksOpenedClassName} = this.state;
    ShrinkingHeader.init(styles.headerShrink);
    ToggleClass.init(navigationMenuButtonId, navigationMenuContentId, navigationMenuLinksOpenedClassName, true);
  }
  render() {
    const {navigationMenuButtonId, navigationMenuContentId, navigationMenuLinksDefaultClassName} = this.state;
    return(
      <Container className="navbar-fixed-top">
        <Row>
          <Column xs={12}>
            <nav id="header" className={`navbar navbar-full ${styles.headerNavigationBase} ${styles.headerBackgroundImage}`}>
              <Row className={commonStyles.heigthInherit}>
                <Column xs={12} lg={4} className={`${commonStyles.heigthInherit} ${commonStyles.flex}`}>
                  <div className={`${styles.headerLogoWrapper} ${commonStyles.flexColumnVerticalCenter}`}>
                    <div className={styles.headerLogoContainer}>
                      <Logotype />
                    </div>
                  </div>
                  <div className={`hidden-lg-up ${commonStyles.flexColumnVerticalCenter} ${styles.headerNavigationMenuButtomContainer}`}>
                    <MenuButton id={navigationMenuButtonId}/>
                  </div>
                </Column>
                <Column xs={12} lg={8} id={navigationMenuContentId}
                  className={`${commonStyles.flexColumnVerticalCenterLgUp} ${navigationMenuLinksDefaultClassName}`}>
                  <NavigationLinkArray/>
                </Column>
              </Row>
            </nav>
          </Column>
        </Row>
      </Container>
    );
  }
}

export default Header;
