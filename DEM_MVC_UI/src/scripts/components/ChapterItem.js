import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import ForumList from '../containers/ForumList';
import TermItem from '../containers/TermItem';
import CollapsibleWrapper from "./CollapsibleWrapper";

class ChapterItem extends React.Component {
  static propTypes = {
    chapterItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired
  };

  bindCollapsibleWrapperItem = () =>({
    uniquePrefix: `chapter-item-with-id-${this.props.chapterItem.id}`,
    titleElement: <Link to={`/Conference/Forum/${this.props.chapterItem.id}`}>{this.props.chapterItem.title}</Link>,
    bodyElement: <ForumList chapterId={this.props.chapterItem.id}/>,
    firstColumnTerm: <TermItem term={{id: 1, value: "Topics"}} />,
    secondColumnTerm:<TermItem term={{id: 2, value: "Posts"}} />,
    thirdColumnTerm: <TermItem term={{id: 3, value: "Last message in"}} />
  })

  collapseSettings = () => ({
    collapsable: true,
    openedByDefault: false
  })

  render(){
    return(
      <CollapsibleWrapper collapsibleWrapperItem={this.bindCollapsibleWrapperItem()} collapseSettings={this.collapseSettings()} />
    );
  }
}

export default ChapterItem;
