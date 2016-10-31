import React from 'react';
import Bold from 'bbCodes/Bold';
import Code from 'bbCodes/Code';
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


export default {
  'b': Bold,
  'i': Italic,
  'u': Underline,
  's': LineThrough,
  //offtopic
  //think
  //color
  //center
  //left
  //right
  //size
  'code': Code,
  //spoiler
  'quote': Quote,
  //email
  'url': Link,
  'img': Image,
  'ol': OrderedList,
  'ul': UnorderedList,
  'li': ListItem,
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
  'p': Paragraph,
  'textLine': TextLine,
  'textPart': TextPart,
  'root': Root
};
