/* eslint react/no-multi-comp: 0 */
/* eslint react/display-name: 0 */

import React from 'react';
//import _ from 'lodash';
import SpanBasedBbCode from 'bbCodes/SpanBasedBbCode';
import Code from 'bbCodes/Code';
import Color from 'bbCodes/Color';
import Image from 'bbCodes/Image';
import Italic from 'bbCodes/Italic';
import LineThrough from 'bbCodes/LineThrough';
import Link from 'bbCodes/Link';
import ListItem from 'bbCodes/ListItem';
import OrderedList from 'bbCodes/OrderedList';
import Paragraph from 'bbCodes/Paragraph';
import Root from 'bbCodes/Root';
import Quote from 'bbCodes/Quote';
import TextLine from 'bbCodes/TextLine';
import TextPart from 'bbCodes/TextPart';
import Underline from 'bbCodes/Underline';
import UnorderedList from 'bbCodes/UnorderedList';
import StringHelper from 'services/helpers/StringHelper';

class BbCodesMap {
  getMaps = {
    'b': (children) =>
      <SpanBasedBbCode key={Math.random()} className="bbCode-bold">{children}</SpanBasedBbCode>,
    'i': (children) =>
      <Italic key={Math.random()}>{children}</Italic>,
    'u': (children) =>
      <Underline key={Math.random()}>{children}</Underline>,
    's': (children) =>
      <LineThrough key={Math.random()}>{children}</LineThrough>,
    //offtopic
    //think
    'color': (children, options) =>
      <Color key={Math.random()} options={options}>{children}</Color>,
    //center
    //left
    //right
    //size
    'code': (children, options) =>
      <Code key={Math.random()} options={options}>{children}</Code>,
    //spoiler
    'quote': (children, options) =>
      <Quote key={Math.random()} options={options}>{children}</Quote>,
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
    'url': (children, options) =>{
      let result= [];
      if(typeof(options) === 'string' && StringHelper.stringIsLink(options)){
        let url = options;
        result.push(<Link key={Math.random()} url={url}>{children}</Link>);
      }
      else if(children){
        for(let child of children)
        {
          if (typeof(child.props['children']) === 'string' && StringHelper.stringIsLink(child.props['children'])){
            let url = child.props['children'];
            result.push(<Link key={Math.random()} url={url}>{url}</Link>);
          } else {
            continue;
          }
        }
      }
      return result;
    },
    'img': (children) =>{
      let result= [];
      if(children)
      {
        for(let child of children)
        {
          if (typeof(child.props['children']) === 'string' && StringHelper.stringIsLink(child.props['children'])){
            let url = child.props['children'];
            result.push(<Image key={Math.random()} url={url}/>);
          } else {
            continue;
          }
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
    'p': (children) =>
      <Paragraph key={Math.random()}>{children}</Paragraph>,
    'textline': (children) =>
      <TextLine key={Math.random()}>{children}</TextLine>,
    'textpart': (children) =>
      <TextPart key={Math.random()}>{children}</TextPart>,
    'root': (children) =>
      <Root key={Math.random()}>{children}</Root>
  };
}

export default new BbCodesMap();
