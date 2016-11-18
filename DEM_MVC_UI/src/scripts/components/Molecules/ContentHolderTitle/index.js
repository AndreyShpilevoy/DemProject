import React, {PropTypes} from 'react';
import {Container, Row, Column, Hidden} from 'DemUi';
import {ArrowLeft} from 'Molecules/SvgImages';
import ToggleClass from 'services/domScripts/ToggleClass';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class ContentHolderTitle extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    titleModel: PropTypes.shape({
      contentHolderHeaderId: PropTypes.string.isRequired,
      titleElement: PropTypes.element.isRequired,
      firstColumnTerm: PropTypes.element,
      secondColumnTerm: PropTypes.element,
      thirdColumnTerm: PropTypes.element,
    }).isRequired,
    collapseSettings: PropTypes.shape({
      collapsable: PropTypes.bool.isRequired,
      openedByDefault: PropTypes.bool.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      iconArrowLeftId: 'iconArrowLeft-' + this.props.titleModel.contentHolderHeaderId,
      toggleIconArrowClass: styles.iconArrowLeftOpened
    };
  }

/* istanbul ignore next */
  componentDidMount() {
    if(this.props.collapseSettings && this.props.collapseSettings.collapsable){
      ToggleClass.init(this.props.titleModel.contentHolderHeaderId, this.state.iconArrowLeftId, this.state.toggleIconArrowClass);
    }
  }

  getRotatedImageComponent = () => {
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

  render(){
    let {titleElement, firstColumnTerm, secondColumnTerm, thirdColumnTerm} = this.props.titleModel;
    return (
      <Container fluid className={`${styles.contentHolderHeader} ${commonStyles.flexColumnVerticalCenter}`}>
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
          {this.getRotatedImageComponent()}
        </Row>
      </Container>
    );
  }
}

export default ContentHolderTitle;
