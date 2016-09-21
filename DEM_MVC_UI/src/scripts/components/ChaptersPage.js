import React, {PropTypes} from 'react';
import _ from 'lodash';
import {ChapterItem} from './_all';

class ChaptersPage extends React.Component {
  static propTypes = {
    chapters: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
   })).isRequired
  };

  sortChapters = () => {
    return  _.sortBy(this.props.chapters, "order");
  }

  mapChapters = () => {
    let mappedChapters = this.sortChapters().map(chapterItem =>
      <ChapterItem key={chapterItem.id} chapterItem={chapterItem} />);
        return mappedChapters;
  }

  render() {
    let chapters = this.mapChapters();
    return (
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 width-100-percent">
              {chapters}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChaptersPage;
