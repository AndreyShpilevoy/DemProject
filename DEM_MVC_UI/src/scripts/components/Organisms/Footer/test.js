/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import Footer from './index';

describe('Footer', () => {
  function setup() {
    return shallow(<Footer />);
  }

  it('should contain 1 SocialMediaLinkArray element',() => {
    const socialMediaLinkArrayElement = setup().find('Connect(SocialMediaLinkArray)');
    expect(socialMediaLinkArrayElement.length).toEqual(1);
  });
});
