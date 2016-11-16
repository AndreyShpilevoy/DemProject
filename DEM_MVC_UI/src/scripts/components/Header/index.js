import React from 'react';
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
      <div className="container navbar-fixed-top">
        <div className="row">
          <div className="col-xs-12">
            <nav id="header" className={`navbar navbar-full ${styles.headerNavigationBase} ${styles.headerBackgroundImage}`}>
              <div className={`row ${commonStyles.heigthInherit}`}>
                <div className={`col-xs-12 col-lg-4 ${commonStyles.heigthInherit} ${commonStyles.flex}`}>
                  <div className={`${styles.headerLogoWrapper} ${commonStyles.flexColumnVerticalCenter}`}>
                    <div className={styles.headerLogoContainer}>
                      <Logotype />
                    </div>
                  </div>
                  <div className={`hidden-lg-up ${commonStyles.flexColumnVerticalCenter} ${styles.headerNavigationMenuButtomContainer}`}>
                    <MenuButton id={navigationMenuButtonId}/>
                  </div>
                </div>
                <div id={navigationMenuContentId}
                  className={`col-xs-12 col-lg-8 ${commonStyles.flexColumnVerticalCenterLgUp} ${navigationMenuLinksDefaultClassName}`}>
                  <NavigationLinkArray/>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
