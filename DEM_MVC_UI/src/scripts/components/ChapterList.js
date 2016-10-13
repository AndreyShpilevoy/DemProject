import React, {PropTypes} from 'react';
import _ from 'lodash';
import ChapterItem from './ChapterItem';

class ChapterList extends React.Component {
  static propTypes = {
    chapterList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
   })).isRequired
  };

  orderChapters = () => {
    return  _.orderBy(this.props.chapterList, "order");
  }

  mapChapters = () => {
    let mappedChapters = this.orderChapters().map(chapterItem =>
      <ChapterItem key={chapterItem.id} chapterItem={chapterItem} />);
        return mappedChapters;
  }

  render() {
    let mappedChapterList = this.mapChapters();
    return (
      <div>
        {mappedChapterList}
      </div>
    );
  }
}

export default ChapterList;
