/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {TopicList} from "../_all";

describe('TopicList', () => {
  function setup() {
    const props = {
      forumId: 1,
      topicList: [{
        id: 1,
        title: "Как деактивировать бомбу",
        postsCount: 215,
        topicViewsCount: 1315,
        latesPostTimeCreation: new Date("2016/09/19 13:42:32"),
        latesPostAutorId: 4,
        latesPostAutorName: "Buba",
        latesPostAutorAvatart: "http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg",
        latesPostAutorGroupColor: "00AA00"
      },{
        id: 3,
        title: "Почему админы дебилы [закрыто намертво]",
        postsCount: 218,
        topicViewsCount: 82847,
        latesPostTimeCreation: new Date("2016/07/12 14:24:11"),
        latesPostAutorId: 5,
        latesPostAutorName: "Agent005",
        latesPostAutorAvatart: "https://pp.vk.me/c9558/u61600334/a_153d373f.jpg",
        latesPostAutorGroupColor: "ff00ff"
      }, {
        id: 2,
        title: "Как активировать бомбу.",
        postsCount: 57,
        topicViewsCount: 847,
        latesPostTimeCreation: new Date("2016/09/22 12:53:09"),
        latesPostAutorId: 2,
        latesPostAutorName: "Bykawka",
        latesPostAutorAvatart: undefined,
        latesPostAutorGroupColor: "fbeab2"
      }]
    };

    return shallow(<TopicList {...props}/>);
  }

  it('should render CollapsibleWrapper',() => {
    const collapsibleWrapperElement = setup().find('CollapsibleWrapper').first();
    expect(collapsibleWrapperElement).toBeTruthy();
  });

  // it('child contains 3 ForumItem components',() => {
  //   const forumItem = setup().find("ForumItem");
  //   expect(forumItem.length).toEqual(3);
  // });
  //
  // it('child ForumItem components should be ordered by order property',() => {
  //   let forumItemOrder = [];
  //   setup().find("ForumItem").forEach(function (node) {
  //     forumItemOrder.push(node.props().forumItem.order);
  //   });
  //   expect(forumItemOrder).toEqual([ 1, 2, 3 ]);
  // });
});
