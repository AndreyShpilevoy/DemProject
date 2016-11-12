/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import Footer from 'components/Footer';

describe('Footer', () => {
  function setup() {
    return shallow(<Footer />);
  }

  it('should render top level div with className "footer-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass('footer-container')).toBeTruthy();
  });

  it('should contain 1 SocialMediaLinkArray element',() => {
    const socialMediaLinkArrayElement = setup().find('Connect(SocialMediaLinkArray)');
    expect(socialMediaLinkArrayElement.length).toEqual(1);
  });
});
