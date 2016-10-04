import React, {PropTypes} from 'react';
import { ToggleClass } from "../utils/_all";
import { ArrowLeft } from "../icons/_all";

class CollapsibleWrapper extends React.Component {
  static propTypes = {
    collapsibleWrapperItem: PropTypes.shappe({
      uniquePrefix: PropTypes.string.isRequired,
      titleElement: PropTypes.element.isRequired,
      bodyElement: PropTypes.element.isRequired,
      firstColumnTerm: PropTypes.element,
      secondColumnTerm: PropTypes.element,
      thirdColumnTerm: PropTypes.element
    }).isRequired,
    collapseSettings:  PropTypes.shappe({
      collapsable: PropTypes.bool.isRequired,
      openedByDefault: PropTypes.bool.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsibleWrapperHeaderId: "collapsible-wrapper-header-" + this.props.collapsibleWrapperItem.uniquePrefix,
      collapsibleWrapperBodyId: "collapsible-wrapper-body-" + this.props.collapsibleWrapperItem.uniquePrefix,
      toggleBodyClass: "collapsible-wrapper-body-opened",
      iconArrowLeftId: "icon-arrow-left-" + this.props.collapsibleWrapperItem.uniquePrefix,
      toggleIconArrowClass: "icon-arrow-left-opened"
    };
  }

/* istanbul ignore next */
  componentDidMount() {
    if(this.props.collapseSettings && this.props.collapseSettings.collapsable){
      ToggleClass.init(this.state.collapsibleWrapperHeaderId, this.state.collapsibleWrapperBodyId, this.state.toggleBodyClass);
      ToggleClass.init(this.state.collapsibleWrapperHeaderId, this.state.iconArrowLeftId, this.state.toggleIconArrowClass);
    }
  }

  getImageComponent = () => {
    let {collapsable, openedByDefault} = this.props.collapseSettings;
    let shouldBeOpen = (collapsable && openedByDefault) || !collapsable;
    return collapsable ?
      <div className="icon-arrow-left-collapsible-wrapper-title">
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
          "collapsible-wrapper-body collapsible-wrapper-body-default collapsible-wrapper-body-opened" :
          "collapsible-wrapper-body collapsible-wrapper-body-default"} id={this.state.collapsibleWrapperBodyId}>
        {this.props.collapsibleWrapperItem.bodyElement}
      </div>);
  }

  render(){
    let {titleElement, firstColumnTerm, secondColumnTerm, thirdColumnTerm} = this.props.collapsibleWrapperItem;
    return(
      <div className="collapsible-wrapper-container">
        <div className="collapsible-wrapper-header flex flex-column-vertical-center container" id={this.state.collapsibleWrapperHeaderId}>
          <div className="flex collapsible-wrapper-header-title-wrapper row">
            <div className="collapsible-wrapper-header-title col-lg-6">
              {titleElement}
            </div>
            <div className="col-lg-6 row hidden-md-down">
              <div className="collapsible-wrapper-header-title-info-label col-lg-3 flex flex-column-vertical-center">
                {firstColumnTerm}
              </div>
              <div className="collapsible-wrapper-header-title-info-label col-lg-3 flex flex-column-vertical-center">
                {secondColumnTerm}
              </div>
              <div className="collapsible-wrapper-header-title-info-label col-lg-6 flex flex-column-vertical-center">
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

export default CollapsibleWrapper;
