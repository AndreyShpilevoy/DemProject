/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {MainConferencePage} from "../_all";

describe('MainConferencePage', () => {
  function setup() {
    return shallow(<MainConferencePage />);
  }

  it('should render "div"',() => {
    const divElement = setup().find('div').first();
    expect(divElement).toBeTruthy();
  });

  it('should contain 3 LastActiveTopicsList element',() => {
    const LastActiveTopicsListElement = setup().find('Connect(LastActiveTopicsList)');
    expect(LastActiveTopicsListElement.length).toEqual(1);
  });

  it('should contain 3 ChapterList element',() => {
    const LastActiveTopicsListElement = setup().find('Connect(ChapterList)');
    expect(LastActiveTopicsListElement.length).toEqual(1);
  });
});
