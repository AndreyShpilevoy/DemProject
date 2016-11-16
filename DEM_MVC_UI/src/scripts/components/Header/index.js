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
    menuButtonId: 'menu-toggle-button',
    menuContentId: 'nav-menu-content',
    menuToggleClass: 'nav-links-opened'
  }

  componentDidMount() {
    const {menuButtonId, menuContentId, menuToggleClass} = this.state;
    ShrinkingHeader.init(styles.headerShrink);
    ToggleClass.init(menuButtonId, menuContentId, menuToggleClass, true);
  }
  render() {
    const {menuButtonId, menuContentId} = this.state;
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
                    <MenuButton id={menuButtonId}/>
                  </div>
                </div>
                <NavigationLinkArray id={menuContentId} />
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
