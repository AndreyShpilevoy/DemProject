/* eslint react/no-multi-comp: 0 */
/* eslint react/display-name: 0 */

import React, {PropTypes} from 'react';
import BbCodeParser from 'services/bbCodes/BbCodeParser';
import BaseSpan from 'Atoms/BbCode_BaseSpan';
import Code from 'Atoms/BbCode_Code';
import Color from 'Atoms/BbCode_Color';
import Email from 'Atoms/BbCode_Email';
import Image from 'Atoms/BbCode_Image';
import Link from 'Atoms/BbCode_Link';
import ListItem from 'Atoms/BbCode_ListItem';
import NewLine from 'Atoms/BbCode_NewLine';
import OffTopic  from 'Atoms/BbCode_OffTopic';
import OrderedList from 'Atoms/BbCode_OrderedList';
import Paragraph from 'Atoms/BbCode_Paragraph';
import Quote from 'Atoms/BbCode_Quote';
import Root from 'Atoms/BbCode_Root';
import TextLine from 'Atoms/BbCode_TextLine';
import Think from 'Atoms/BbCode_Think';
import UnorderedList from 'Atoms/BbCode_UnorderedList';
import StringHelper from 'services/helpers/StringHelper';
import styles from './index.scss';


const bbCodesMap = {
  'b': (children) =>
    <BaseSpan key={Math.random()} className={styles.bold}>{children}</BaseSpan>,
  'i': (children) =>
    <BaseSpan key={Math.random()} className={styles.italic}>{children}</BaseSpan>,
  'u': (children) =>
    <BaseSpan key={Math.random()} className={styles.underline}>{children}</BaseSpan>,
  's': (children) =>
    <BaseSpan key={Math.random()} className={styles.lineThrough}>{children}</BaseSpan>,
  'offtopic': (children) =>
    <OffTopic key={Math.random()}>{children}</OffTopic>,
  'think': (children) =>
    <Think key={Math.random()}>{children}</Think>,
  'color': (children, options) =>
    <Color key={Math.random()} options={options}>{children}</Color>,
  'center': (children) =>
    <BaseSpan key={Math.random()} className={`${styles.position} ${styles.center}`}>{children}</BaseSpan>,
  'left': (children) =>
    <BaseSpan key={Math.random()} className={`${styles.position} ${styles.left}`}>{children}</BaseSpan>,
  'right': (children) =>
    <BaseSpan key={Math.random()} className={`${styles.position} ${styles.right}`}>{children}</BaseSpan>,
  'size': (children, options) =>{
    let fontSizeByDefault = 16;
    if(options <= 150 && options > 0){
      return (
        <BaseSpan key={Math.random()} className='' styleObject={{fontSize: `${options/fontSizeByDefault}rem`}}>
          {children}
        </BaseSpan>
      );
    } else {
      return (
        <BaseSpan key={Math.random()} className='' styleObject={{fontSize: '1rem'}}>
          {children}
        </BaseSpan>
      );
    }
  },
  'code': (children, options) =>{
    let key = Math.random();
    return <Code key={key} id={key} options={options}>{children}</Code>;
  },
  //spoiler
  'quote': (children, options) =>
    <Quote key={Math.random()} options={options}>{children}</Quote>,
  'email': (children) =>{
    let result= [];
    let addBreak = children.length > 1;
    for(let child of children)
    {
      if (typeof(child.props['children']) === 'string' && StringHelper.stringIsEmail(child.props['children'])){
        let email = child.props['children'];
        result.push(<Email key={Math.random()} email={email} addBreak={addBreak}>{email}</Email>);
      } else {
        continue;
      }
    }
    return result;
  },
  'url': (children, options) =>{
    let result= [];
    if(typeof(options) === 'string' && StringHelper.stringIsLink(options)){
      let url = options;
      result.push(<Link key={Math.random()} url={url}>{children}</Link>);
    }
    else{
      let addBreak = children.length > 1;
      for(let child of children)
      {
        if (typeof(child.props['children']) === 'string' && StringHelper.stringIsLink(child.props['children'])){
          let url = child.props['children'];
          result.push(<Link key={Math.random()} url={url} addBreak={addBreak}>{url}</Link>);
        } else {
          continue;
        }
      }
    }
    return result;
  },
  'img': (children) =>{
    let result= [];
    let addBreak = children.length > 1;
    for(let child of children)
    {
      if (typeof(child.props['children']) === 'string' && StringHelper.stringIsLink(child.props['children'])){
        let url = child.props['children'];
        result.push(<Image key={Math.random()} url={url} addBreak={addBreak}/>);
      } else {
        continue;
      }
    }
    return result;
  },
  'ol': (children) =>
    <OrderedList key={Math.random()}>{children}</OrderedList>,
  'ul': (children) =>
    <UnorderedList key={Math.random()}>{children}</UnorderedList>,
  'li': (children) =>
    <ListItem key={Math.random()}>{children}</ListItem>,
  //media
  'p': (children) =>
    <Paragraph key={Math.random()}>{children}</Paragraph>,
  'br': () =>
    <NewLine key={Math.random()}/>,
  'textline': (children) =>
    <TextLine key={Math.random()}>{children}</TextLine>,
  'root': (children) =>
    <Root key={Math.random()}>{children}</Root>
};
const bbCodesMapNames = Object.getOwnPropertyNames(bbCodesMap);

class BbCodePresenter extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  state = {
    parsedTree: BbCodeParser.getParsedTree(this.props.text)
  }

  getComponentByTagName = (tagName) => {
    return bbCodesMap[tagName.toLowerCase()];
  }

  mapTreeToComponent = () => {
    let parsedTree = this.state.parsedTree;
    let mappedTree;
    if(parsedTree.type === 'root' && parsedTree.children.length > 0){
      mappedTree = this.mapNodeToComponent(parsedTree);
    }
    return mappedTree;
  }

  mapNodeToComponent = (node) => {
    let Component = this.getComponentByTagName(node.type);
    let result;
    if(Component){
      if(node.children.length > 0) {
        let children = [];
        for(let child of node.children){
          children.push(this.mapNodeToComponent(child));
        }
        result = Component(children, node.options);
      }
      else {
        result = Component(node.content, node.options);
      }
    }
    return result;
  }

  render(){
    return this.mapTreeToComponent();
  }
}

export default BbCodePresenter;
export {bbCodesMapNames};
