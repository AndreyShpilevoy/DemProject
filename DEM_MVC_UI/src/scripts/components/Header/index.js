import React from 'react';
import NavigationLinkArray from 'containers/NavigationLinkArray';
import NavigationMenuToggleButton from 'components/NavigationMenuToggleButton';
import Logotype from 'components/Logotype';
import ToggleClass from 'services/domScripts/ToggleClass';
import ShrinkingHeader from 'services/domScripts/ShrinkingHeader';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class Header extends React.Component {
  componentDidMount() {
    ShrinkingHeader.init(styles.headerShrink);
    ToggleClass.init('menu-toggle-button', 'nav-menu-content', 'nav-links-opened', true);
  }
  render() {
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
                  <NavigationMenuToggleButton />
                </div>
                <NavigationLinkArray />
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
