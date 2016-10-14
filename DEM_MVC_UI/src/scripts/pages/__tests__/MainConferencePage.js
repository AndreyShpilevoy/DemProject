/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import MainConferencePage from "../MainConferencePage";

describe('MainConferencePage', () => {
  function setup() {
    return shallow(<MainConferencePage />);
  }

  it('should render "div"',() => {
    const divElement = setup().find('div').first();
    expect(divElement).toBeTruthy();
  });

  it('should contain 3 LastActiveTopicsArray element',() => {
    const LastActiveTopicsArrayElement = setup().find('Connect(LastActiveTopicsArray)');
    expect(LastActiveTopicsArrayElement.length).toEqual(1);
  });

  it('should contain 3 ChapterArray element',() => {
    const LastActiveTopicsArrayElement = setup().find('Connect(ChapterArray)');
    expect(LastActiveTopicsArrayElement.length).toEqual(1);
  });
});
