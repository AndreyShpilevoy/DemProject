/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import SocialMediaLinkItem from "../SocialMediaLinkItem";

describe('SocialMediaLinkItem', () => {
  function setup(svgName) {
    const props = {
      sociaMediaLinkItem: {
        id: 1,
        order: 1,
        title: "Forum Item Title",
        href: "http://1.ua",
        svgName: svgName
      }
    };

    return shallow(<SocialMediaLinkItem {...props}/>);
  }

  it('should render top level div with className "social-media-link"',() => {
    const divElement = setup("Steam").find('div').first();
    expect(divElement.hasClass("social-media-link")).toBeTruthy();
  });

  it('should contain 1 "a" element if Icon element is defined',() => {
    const aElement = setup("Steam").find('a');
    expect(aElement.length).toEqual(1);
  });

  it('should contain 1 "a" element if Icon element is not defined',() => {
    const aElement = setup("Two").find('a');
    expect(aElement.length).toEqual(1);
  });

  it('should contain 1 "Vk" element if Icon element is defined',() => {
    const aElement = setup("Vk").find('Vk');
    expect(aElement.length).toEqual(1);
  });

  it('should contain 0 "Icon" element if Icon element is not defined',() => {
    const aElement = setup("Two").find('Icon');
    expect(aElement.length).toEqual(0);
  });
});
