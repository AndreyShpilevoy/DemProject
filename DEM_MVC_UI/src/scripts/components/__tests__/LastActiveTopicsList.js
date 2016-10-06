/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {LastActiveTopicsList} from "../_all";

describe('LastActiveTopicsList', () => {
  function setup() {
    const props = {
      lastActiveTopics: [{
          id: 1,
          title: "Как деактивировать бомбу",
          postsCount: 215,
          topicViewsCount: 1315,
          latesPostTimeCreation: new Date("2016/09/19 13:42:32"),
          latesPostAutorId: 4,
          latesPostAutorName: "Buba",
          latesPostAutorAvatart: "http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg",
          latesPostAutorGroupColor: "00AA00",
          parentForumId: 10,
          parentForumTitle: "Общие вопросы"
      }, {
          id: 2,
          title: "Как активировать бомбу.",
          postsCount: 57,
          topicViewsCount: 847,
          latesPostTimeCreation: new Date("2016/09/22 12:53:09"),
          latesPostAutorId: 2,
          latesPostAutorName: "Bykawka",
          latesPostAutorAvatart: undefined,
          latesPostAutorGroupColor: "fbeab2",
          parentForumId: 20,
          parentForumTitle: "Технические вопросы"
      },{
          id: 3,
          title: "Почему админы дебилы [закрыто намертво]",
          postsCount: 218,
          topicViewsCount: 82847,
          latesPostTimeCreation: new Date("2016/07/12 14:24:11"),
          latesPostAutorId: 5,
          latesPostAutorName: "Agent005",
          latesPostAutorAvatart: "https://pp.vk.me/c9558/u61600334/a_153d373f.jpg",
          latesPostAutorGroupColor: "ff00ff",
          parentForumId: 30,
          parentForumTitle: "Обсуждение модификаций"
      }]
    };

    return shallow(<LastActiveTopicsList {...props}/>);
  }

  it('should render CollapsibleWrapper',() => {
    const collapsibleWrapperElement = setup().find('CollapsibleWrapper').first();
    expect(collapsibleWrapperElement).toBeTruthy();
  });

  it('props should contain "collapsibleWrapperItem" object with "last-topic-list" equel to "last-topic-list"',() => {
    expect(setup().prop("collapsibleWrapperItem").uniquePrefix).toEqual("last-topic-list");
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"titleElement.type.displayName" equel to "Connect(TermItem)", with ' +
     '"titleElement.props.term" equel to "Last messages"',() => {
    const titleElement = setup().prop("collapsibleWrapperItem").titleElement;
    expect(titleElement.type.displayName).toEqual("Connect(TermItem)");
    expect(titleElement.props.term).toEqual({"id": 26, "value": "Last messages"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"bodyElement.props.children.length" equel to "3", with ' +
     '"bodyElement.props.children[0].type.name" equel to "TopicItem"',() => {
    const bodyElement = setup().prop("collapsibleWrapperItem").bodyElement;
    expect(bodyElement.props.children.length).toEqual(3);
    expect(bodyElement.props.children[0].type.name).toEqual("TopicItem");
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"firstColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"firstColumnTerm.props.term" equel to expected model',() => {
    const firstColumnTerm = setup().prop("collapsibleWrapperItem").firstColumnTerm;
    expect(firstColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(firstColumnTerm.props.term).toEqual({id: 2, value: "Posts"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"secondColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"secondColumnTerm.props.term" equel to expected model',() => {
    const secondColumnTerm = setup().prop("collapsibleWrapperItem").secondColumnTerm;
    expect(secondColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(secondColumnTerm.props.term).toEqual({id: 22, value: "Views"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"thirdColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"thirdColumnTerm.props.term" equel to expected model',() => {
    const thirdColumnTerm = setup().prop("collapsibleWrapperItem").thirdColumnTerm;
    expect(thirdColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(thirdColumnTerm.props.term).toEqual({id: 3, value: "Last message in"});
  });
});
