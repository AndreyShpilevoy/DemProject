import React, {PropTypes} from 'react';
import {ForumList} from '../containers/_all.js';
import { ToggleClass } from "../reactLess/_all";

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
      toggleBodyClass: "chapter-body-opened"
    };
  }

  componentDidMount() {
    ToggleClass.init(this.state.chapterHeaderId, this.state.chapterBodyId, this.state.toggleBodyClass);
  }

  render(){
    let chapterItem = this.props.chapterItem;
    return(
      <div className="chapter-container">
        <div className="chapter-header flex flex-column-vertical-center" id={this.state.chapterHeaderId}>
          <div className="chapter-header-title">
            {chapterItem.title}
          </div>
        </div>
        <div className="chapter-body chapter-body-default chapter-body-opened" id={this.state.chapterBodyId}>
          <ForumList chapterId={this.props.chapterItem.id}/>
        </div>
      </div>
    );
  }
}

export default ChapterItem;
