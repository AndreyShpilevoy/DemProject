/* eslint react/no-multi-comp: 0 */
/* eslint react/display-name: 0 */

import React from 'react';
//import _ from 'lodash';
import BaseSpan from 'bbCodes/BaseSpan';
import Code from 'bbCodes/Code';
import Color from 'bbCodes/Color';
import Image from 'bbCodes/Image';
import Link from 'bbCodes/Link';
import ListItem from 'bbCodes/ListItem';
import OrderedList from 'bbCodes/OrderedList';
import Paragraph from 'bbCodes/Paragraph';
import Root from 'bbCodes/Root';
import Quote from 'bbCodes/Quote';
import TextLine from 'bbCodes/TextLine';
import UnorderedList from 'bbCodes/UnorderedList';
import StringHelper from 'services/helpers/StringHelper';

class BbCodesMap {
  getMaps = {
    'b': (children) =>
      <BaseSpan key={Math.random()} className="bbCode-bold">{children}</BaseSpan>,
    'i': (children) =>
      <BaseSpan key={Math.random()} className="bbCode-italic">{children}</BaseSpan>,
    'u': (children) =>
      <BaseSpan key={Math.random()} className="bbCode-underline">{children}</BaseSpan>,
    's': (children) =>
      <BaseSpan key={Math.random()} className="bbCode-line-through">{children}</BaseSpan>,
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
    'textlinewithbreak': (children) =>
      <TextLine key={Math.random()} addBreak>{children}</TextLine>,
    'root': (children) =>
      <Root key={Math.random()}>{children}</Root>
  };
}

export default new BbCodesMap();
