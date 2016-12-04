import React, {PropTypes} from 'react';
import ContentHolderBody from 'Atoms/ContentHolderBody';
import ContentHolderTitle from 'Molecules/ContentHolderTitle';
import ToggleClass from 'services/domScripts/ToggleClass';
import styles from './index.scss';

class ContentHolder extends React.Component {
  static propTypes = {
    contentHolderItem: PropTypes.shape({
      uniquePrefix: PropTypes.string.isRequired,
      titleElement: PropTypes.element.isRequired,
      bodyElement: PropTypes.node.isRequired,
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
      toggleBodyClass: styles.contentHolderBodyWrapperOpened,
    };
  }

/* istanbul ignore next */
  componentDidMount() {
    if(this.props.collapseSettings && this.props.collapseSettings.collapsable){
      ToggleClass.init(this.state.contentHolderHeaderId, this.state.contentHolderBodyId, this.state.toggleBodyClass);
    }
  }

  getBodyClassName = () => {
    let {collapsable, openedByDefault} = this.props.collapseSettings;
    let shouldBeOpen = (collapsable && openedByDefault) || !collapsable;
    return `${styles.contentHolderBodyWrapper} ${shouldBeOpen ? styles.contentHolderBodyWrapperOpened : null}`;
  }

  render(){
    let {collapseSettings, contentHolderItem} = this.props;
    let titleModel={
      contentHolderHeaderId: this.state.contentHolderHeaderId,
      titleElement: contentHolderItem.titleElement,
      firstColumnTerm: contentHolderItem.firstColumnTerm,
      secondColumnTerm: contentHolderItem.secondColumnTerm,
      thirdColumnTerm: contentHolderItem.thirdColumnTerm
    };
    return(
      <div className={styles.contentHolder}>
        <div id={this.state.contentHolderHeaderId}>
          <ContentHolderTitle collapseSettings={collapseSettings} titleModel={titleModel}/>
        </div>
        <div id={this.state.contentHolderBodyId} className={this.getBodyClassName()}>
          <ContentHolderBody>
            {this.props.contentHolderItem.bodyElement}
          </ContentHolderBody>
        </div>
      </div>
    );
  }
}

export default ContentHolder;
