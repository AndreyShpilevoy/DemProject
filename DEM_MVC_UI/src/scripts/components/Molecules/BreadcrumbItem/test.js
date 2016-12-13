/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import breadcrumbs from 'api/__fakeData__/breadcrumbs';
import BreadcrumbItem from './index';

describe('BreadcrumbItem', () => {
  function setup(currentPage) {
    const props = {
      breadcrumbItem: breadcrumbs[0],
      setActive: currentPage
    };
    return shallow(<BreadcrumbItem {...props}/>);
  }

  it('Link component has prop "to" equel to "/Conference"',() => {
    const linkComponent = setup(false).find('Link');
    expect(linkComponent.prop('to')).toBe('/Conference');
  });

});
