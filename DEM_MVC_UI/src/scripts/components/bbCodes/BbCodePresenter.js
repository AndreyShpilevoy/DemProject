import React, {PropTypes} from 'react';
//import _ from 'lodash';
import BbCodeParser from 'services/bbCodes/BbCodeParser';
import Bold from 'bbCodes/Bold';
import Code from 'bbCodes/Code';
//import Image from 'bbCodes/Image';
import Italic from 'bbCodes/Italic';
import LineThrough from 'bbCodes/LineThrough';
//import Link from 'bbCodes/Link';
import ListItem from 'bbCodes/ListItem';
import OrderedList from 'bbCodes/OrderedList';
import Paragraph from 'bbCodes/Paragraph';
import Root from 'bbCodes/Root';
import Quote from 'bbCodes/Quote';
import TextLine from 'bbCodes/TextLine';
import TextPart from 'bbCodes/TextPart';
import Underline from 'bbCodes/Underline';
import UnorderedList from 'bbCodes/UnorderedList';

class BbCodePresenter extends React.Component {
  static propTypes = {
    text: PropTypes.object.isRequired
  };

  state = {
    parsedTree: BbCodeParser.getParsedTree(this.props.text),
    mappedComponents: {
      'b': (children, attributes) =>
        <Bold attributes={attributes}>{children}</Bold>,
      'i': (children, attributes) =>
        <Italic attributes={attributes}>{children}</Italic>,
      'u': (children, attributes) =>
        <Underline attributes={attributes}>{children}</Underline>,
      's': (children, attributes) =>
        <LineThrough attributes={attributes}>{children}</LineThrough>,
      //offtopic
      //think
      //color
      //center
      //left
      //right
      //size
      'code': (children, attributes) =>
        <Code attributes={attributes}>{children}</Code>,
      //spoiler
      'quote': (children, attributes) =>
        <Quote attributes={attributes}>{children}</Quote>,
      //email
      // 'url': ({ url }, children, transformChildren) => {
      //   if(typeof url === 'string') {
      //     return <Link url={url}>{transformChildren(children)}</Link>;
      //   }
      //   if(children.length === 0) {
      //     return null;
      //   }
      //   const [{ type, data }] = children;
      //   if(type === 'text') {
      //     return <Link url={data}>{data}</Link>;
      //   }
      //   return null;
      // },
      // 'image': ({ url }, children) => {
      //   if(typeof url === 'string') {
      //     if(_.every(children, ({ type }) => type === 'text')) {
      //       return <Image label={children.map(({ data }) => data).join('')} url={url} />;
      //     }
      //     return <Image label={url} url={url} />;
      //   }
      //   if(children.length === 0) {
      //     return null;
      //   }
      //   const [{ type, data }] = children;
      //   if(type === 'text') {
      //     return <Image label={data} url={data} />;
      //   }
      //   return null;
      // },
      'ol': (children, attributes) =>
        <OrderedList attributes={attributes}>{children}</OrderedList>,
      'ul': (children, attributes) =>
        <UnorderedList attributes={attributes}>{children}</UnorderedList>,
      'li': (children, attributes) =>
        <ListItem attributes={attributes}>{children}</ListItem>,
      //table
      //tr
      //td
      //th
      //h1
      //h2
      //h3
      //h4
      //h5
      //media
      'p': (children, attributes) =>
        <Paragraph attributes={attributes}>{children}</Paragraph>,
      'textLine': (children, attributes) =>
        <TextLine attributes={attributes}>{children}</TextLine>,
      'textPart': (children, attributes) =>
        <TextPart attributes={attributes}>{children}</TextPart>,
      'root': (children, attributes) =>
        <Root attributes={attributes}>{children}</Root>
    }
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
        result = Component(children, {});
      }
      else {
        result = Component(node.content, {});
      }
    }
    return result;
  }

  getComponentByTagName = (tagName) => {
    return this.state.mappedComponents[tagName];
  }

  render(){
    return this.mapTreeToComponent();
  }
}

export default BbCodePresenter;
//BbCodeParser.getParsedTree()
