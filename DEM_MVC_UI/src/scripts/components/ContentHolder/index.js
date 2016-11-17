import React, {PropTypes} from 'react';
import {Container, Row, Column, Hidden} from 'DemUi';
import ToggleClass from 'services/domScripts/ToggleClass';
import ArrowLeft from 'components/icons/ArrowLeft';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class ContentHolder extends React.Component {
  static propTypes = {
    contentHolderItem: PropTypes.shape({
      uniquePrefix: PropTypes.string.isRequired,
      titleElement: PropTypes.element.isRequired,
      bodyElement: PropTypes.element.isRequired,
      firstColumnTerm: PropTypes.element,
      secondColumnTerm: PropTypes.element,
      thirdColumnTerm: PropTypes.element
    }).isRequired,
    collapseSettings:  PropTypes.shape({
      collapsable: PropTypes.bool.isRequired,
      openedByDefault: PropTypes.bool.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      contentHolderHeaderId: 'contentHolderHeader-' + this.props.contentHolderItem.uniquePrefix,
      contentHolderBodyId: 'contentHolderBody-' + this.props.contentHolderItem.uniquePrefix,
      toggleBodyClass: styles.contentHolderBodyOpened,
      iconArrowLeftId: 'iconArrowLeft-' + this.props.contentHolderItem.uniquePrefix,
      toggleIconArrowClass: styles.iconArrowLeftOpened
    };
  }

/* istanbul ignore next */
  componentDidMount() {
    if(this.props.collapseSettings && this.props.collapseSettings.collapsable){
      ToggleClass.init(this.state.contentHolderHeaderId, this.state.contentHolderBodyId, this.state.toggleBodyClass);
      ToggleClass.init(this.state.contentHolderHeaderId, this.state.iconArrowLeftId, this.state.toggleIconArrowClass);
    }
  }

  getImageComponent = () => {
    let {collapsable, openedByDefault} = this.props.collapseSettings;
    let shouldBeOpen = (collapsable && openedByDefault) || !collapsable;
    return collapsable ?
      <div className={styles.iconArrowLeftHolder}>
        <ArrowLeft className={shouldBeOpen ?
          `${styles.iconArrowLeft} ${styles.iconArrowLeftOpened}` :
          styles.iconArrowLeft} id={this.state.iconArrowLeftId} />
      </div> :
      null;
  }

  getBodyComponent = () => {
    let {collapsable, openedByDefault} = this.props.collapseSettings;
    let shouldBeOpen = (collapsable && openedByDefault) || !collapsable;
    let commonClassNamePart = `${styles.contentHolderBody} ${styles.contentHolderBodyDefault}`;
    return (
      <div className={shouldBeOpen ?
          `${commonClassNamePart} ${styles.contentHolderBodyOpened}` :
          commonClassNamePart} id={this.state.contentHolderBodyId}>
        {this.props.contentHolderItem.bodyElement}
      </div>);
  }

  render(){
    let {titleElement, firstColumnTerm, secondColumnTerm, thirdColumnTerm} = this.props.contentHolderItem;
    return(
      <div className={styles.contentHolder}>
        <Container className={`${styles.contentHolderHeader} ${commonStyles.flexColumnVerticalCenter}`}
          id={this.state.contentHolderHeaderId}>
          <Row className={`${commonStyles.flex} ${styles.contentHolderHeaderTitleWrapper}`}>
            <Column lg={6} className={styles.contentHolderHeaderTitle}>
              {titleElement}
            </Column>
            <Column lg={6} className={commonStyles.flexColumnVerticalCenter}>
              <Hidden md={'down'}>
                <Row>
                  <Column lg={3} className={styles.contentHolderHeaderTitleInfoLabel}>
                    {firstColumnTerm}
                  </Column>
                  <Column lg={3} className={styles.contentHolderHeaderTitleInfoLabel}>
                    {secondColumnTerm}
                  </Column>
                  <Column lg={6} className={styles.contentHolderHeaderTitleInfoLabel}>
                    {thirdColumnTerm}
                  </Column>
                </Row>
              </Hidden>
            </Column>
            {this.getImageComponent()}
          </Row>
        </Container>
        {this.getBodyComponent()}
      </div>
    );
  }
}

export default ContentHolder;
