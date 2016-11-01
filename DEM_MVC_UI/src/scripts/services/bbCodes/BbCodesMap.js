/* eslint react/no-multi-comp: 0 */
/* eslint react/display-name: 0 */

import React from 'react';
//import _ from 'lodash';
import Bold from 'bbCodes/Bold';
import Code from 'bbCodes/Code';
import Color from 'bbCodes/Color';
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

class BbCodesMap {
  getMaps = {
    'b': (children) =>
      <Bold key={Math.random()}>{children}</Bold>,
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
