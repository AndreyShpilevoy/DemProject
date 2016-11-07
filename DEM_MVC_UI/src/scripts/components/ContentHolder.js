import React, {PropTypes} from 'react';
import ToggleClass from "services/domScripts/ToggleClass";
import ArrowLeft from "components/icons/ArrowLeft";

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
      contentHolderHeaderId: "content-holder-header-" + this.props.contentHolderItem.uniquePrefix,
      contentHolderBodyId: "content-holder-body-" + this.props.contentHolderItem.uniquePrefix,
      toggleBodyClass: "content-holder-body-opened",
      iconArrowLeftId: "icon-arrow-left-" + this.props.contentHolderItem.uniquePrefix,
      toggleIconArrowClass: "icon-arrow-left-opened"
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
      <div className="icon-arrow-left-content-holder-title">
        <ArrowLeft className={shouldBeOpen ?
          "icon-arrow-left icon-arrow-left-opened" :
          "icon-arrow-left"} id={this.state.iconArrowLeftId} />
      </div> :
      null;
  }

  getBodyComponent = () => {
    let {collapsable, openedByDefault} = this.props.collapseSettings;
    let shouldBeOpen = (collapsable && openedByDefault) || !collapsable;
    return (
      <div className={shouldBeOpen ?
          "content-holder-body content-holder-body-default content-holder-body-opened" :
          "content-holder-body content-holder-body-default"} id={this.state.contentHolderBodyId}>
        {this.props.contentHolderItem.bodyElement}
      </div>);
  }

  render(){
    let {titleElement, firstColumnTerm, secondColumnTerm, thirdColumnTerm} = this.props.contentHolderItem;
    return(
      <div className="content-holder-container">
        <div className="content-holder-header flex flex-column-vertical-center container" id={this.state.contentHolderHeaderId}>
          <div className="flex content-holder-header-title-wrapper row">
            <div className="content-holder-header-title col-lg-6">
              {titleElement}
            </div>
            <div className="col-lg-6 row hidden-md-down">
              <div className="content-holder-header-title-info-label col-lg-3 flex flex-column-vertical-center">
                {firstColumnTerm}
              </div>
              <div className="content-holder-header-title-info-label col-lg-3 flex flex-column-vertical-center">
                {secondColumnTerm}
              </div>
              <div className="content-holder-header-title-info-label col-lg-6 flex flex-column-vertical-center">
                {thirdColumnTerm}
              </div>
            </div>
            {this.getImageComponent()}
          </div>
        </div>
        {this.getBodyComponent()}
      </div>
    );
  }
}

export default ContentHolder;
