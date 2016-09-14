import React, {PropTypes} from 'react';
import {ForumList} from '../containers/_all.js';

class ChapterItem extends React.Component {
  static propTypes = {
    chapterItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired
  };

  render(){
    let chapterItem = this.props.chapterItem;
    return(
      <div className="chapter-container">
        <div className="chapter-header flex flex-column-vertical-center">
          <div className="chapter-header-title">
            {chapterItem.title}
          </div>
        </div>
        <div className="chapter-body">
          <ForumList chapterId={this.props.chapterItem.id}/>
        </div>
      </div>
    );
  }
}

export default ChapterItem;
