import React, {PropTypes} from 'react';
import _ from 'lodash';
import ChapterItem from './ChapterItem';

class ChapterArray extends React.Component {
  static propTypes = {
    chapterArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
   })).isRequired
  };

  orderChapters = () => {
    return  _.orderBy(this.props.chapterArray, "order");
  }

  mapChapters = () => {
    let mappedChapters = this.orderChapters().map(chapterItem =>
      <ChapterItem key={chapterItem.id} chapterItem={chapterItem} />);
        return mappedChapters;
  }

  render() {
    let mappedChapterArray = this.mapChapters();
    return (
      <div>
        {mappedChapterArray}
      </div>
    );
  }
}

export default ChapterArray;
