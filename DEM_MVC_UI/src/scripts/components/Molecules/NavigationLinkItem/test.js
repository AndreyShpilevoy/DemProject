/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import navigationLinks from 'api/__fakeData__/navigationLinks';
import NavigationLinkItem from './index';

describe('NavigationLinkItem', () => {
  function setup() {
    const props = {
      navigationLinkItem: navigationLinks[0]
    };
    return shallow(<NavigationLinkItem {...props}/>);
  }

  it('should render top level li',() => {
    const liElement = setup().find('li');
    expect(liElement.length).toBe(1);
  });

  it('should render Link component',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.length).toBe(1);
  });

  it('Link component has title equel to "Conference"',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.prop('children')).toBe('Conference');
  });

  it('Link component has prop "to" equel to "/"',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.prop('to')).toBe('/');
  });

  it('should render div for Navigation Link Separator',() => {
    const divElement = setup().find('div');
    expect(divElement.length).toBe(1);
  });

});
