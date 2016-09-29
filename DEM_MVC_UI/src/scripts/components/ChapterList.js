import React, {PropTypes} from 'react';
import _ from 'lodash';
import {ChapterItem} from './_all';

class ChapterList extends React.Component {
  static propTypes = {
    chapterList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
   })).isRequired
  };

  sortChapters = () => {
    return  _.sortBy(this.props.chapterList, "order");
  }

  mapChapters = () => {
    let mappedChapters = this.sortChapters().map(chapterItem =>
      <ChapterItem key={chapterItem.id} chapterItem={chapterItem} />);
        return mappedChapters;
  }

  render() {
    let mappedChapterList = this.mapChapters();
    return (
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 width-100-percent">
              {mappedChapterList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChapterList;
