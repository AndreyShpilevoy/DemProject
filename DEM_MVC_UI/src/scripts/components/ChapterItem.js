import React, {PropTypes} from 'react';
import {ForumList} from '../containers/_all.js';
import { ToggleClass } from "../reactLess/_all";
import { ArrowLeft } from "../icons/_all";

class ChapterItem extends React.Component {
  static propTypes = {
    chapterItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      chapterHeaderId: "chapter-header-" + this.props.chapterItem.id,
      chapterBodyId: "chapter-body-" + this.props.chapterItem.id,
      toggleBodyClass: "chapter-body-opened",
      iconArrowLeftId: "icon-arrow-left-" + this.props.chapterItem.id,
      toggleIconArrowClass: "icon-arrow-left-opened"
    };
  }

  componentDidMount() {
    ToggleClass.init(this.state.chapterHeaderId, this.state.chapterBodyId, this.state.toggleBodyClass);
    ToggleClass.init(this.state.chapterHeaderId, this.state.iconArrowLeftId, this.state.toggleIconArrowClass);
  }

  render(){
    let chapterItem = this.props.chapterItem;
    return(
      <div className="chapter-container">
        <div className="chapter-header flex flex-column-vertical-center" id={this.state.chapterHeaderId}>
          <div className="flex chapter-header-wrapper">
            <div className="chapter-header-title">
              {chapterItem.title}
            </div>
            <div className="icon-arrow-left-chapter-title">
              <ArrowLeft className="icon-arrow-left" id={this.state.iconArrowLeftId} />
            </div>
          </div>
        </div>
        <div className="chapter-body chapter-body-default" id={this.state.chapterBodyId}>
          <ForumList chapterId={this.props.chapterItem.id}/>
        </div>
      </div>
    );
  }
}

export default ChapterItem;
