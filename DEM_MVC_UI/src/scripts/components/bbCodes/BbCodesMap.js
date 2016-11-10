/* eslint react/no-multi-comp: 0 */
/* eslint react/display-name: 0 */

import React from 'react';
import BaseSpan from 'bbCodes/BaseSpan';
import Code from 'bbCodes/Code';
import Color from 'bbCodes/Color';
import Image from 'bbCodes/Image';
import Email from 'bbCodes/Email';
import Link from 'bbCodes/Link';
import ListItem from 'bbCodes/ListItem';
import OffTopic  from 'bbCodes/OffTopic';
import OrderedList from 'bbCodes/OrderedList';
import Paragraph from 'bbCodes/Paragraph';
import Root from 'bbCodes/Root';
import Quote from 'bbCodes/Quote';
import NewLine from 'bbCodes/NewLine';
import TextLine from 'bbCodes/TextLine';
import Think from 'bbCodes/Think';
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
    'offtopic': (children) =>
      <OffTopic key={Math.random()}>{children}</OffTopic>,
    'think': (children) =>
      <Think key={Math.random()}>{children}</Think>,
    'color': (children, options) =>
      <Color key={Math.random()} options={options}>{children}</Color>,
    'center': (children) =>
      <BaseSpan key={Math.random()} className="bbCode-position bbCode-center">{children}</BaseSpan>,
    'left': (children) =>
      <BaseSpan key={Math.random()} className="bbCode-position bbCode-left">{children}</BaseSpan>,
    'right': (children) =>
      <BaseSpan key={Math.random()} className="bbCode-position bbCode-right">{children}</BaseSpan>,
    'size': (children, options) =>{
      let fontSizeByDefault = 16;
      if(options <= 150 && options > 0){
        return (
          <BaseSpan key={Math.random()} className="bbCode-size" styleObject={{fontSize: `${options/fontSizeByDefault}rem`}}>
            {children}
          </BaseSpan>
        );
      } else {
        return (
          <BaseSpan key={Math.random()} className="bbCode-size" styleObject={{fontSize: '1rem'}}>
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
}

export default new BbCodesMap();
