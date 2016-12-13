/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import socialMediaLinks from 'api/__fakeData__/socialMediaLinks';
import SocialMediaLinkItem from './index';

describe('SocialMediaLinkItem', () => {
  function setup(svgName) {
    const props = {
      sociaMediaLinkItem: Object.assign({}, socialMediaLinks[0], {svgName: svgName})
    };

    return shallow(<SocialMediaLinkItem {...props}/>);
  }

  it('should contain 1 "a" element if Icon element is defined',() => {
    const aElement = setup('Steam').find('a');
    expect(aElement.length).toEqual(1);
    expect(aElement.node.type).toEqual('a');
  });

  it('should nor contain any elements if Name of image is wrong',() => {
    expect(setup('Two').node).toBeNull();
  });

  it('should contain 1 "Icon_Vk" element if Icon element is defined',() => {
    const aElement = setup('Vk').find('Icon_Vk');
    expect(aElement.length).toEqual(1);
  });

  it('should contain 0 "Icon" element if Icon element is not defined',() => {
    const aElement = setup('Two').find('Icon');
    expect(aElement.length).toEqual(0);
  });
});
