/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import BreadcrumbArray from 'components/BreadcrumbArray';
import breadcrumbs from 'api/__fakeData__/breadcrumbs';

describe('BreadcrumbArray', () => {
  function setup(moreThenFour) {
    const props = {
      breadcrumbArray: moreThenFour ?
        [breadcrumbs[2], breadcrumbs[0], breadcrumbs[4], breadcrumbs[3], breadcrumbs[1]]:
        [breadcrumbs[2], breadcrumbs[0], breadcrumbs[1]]
    };

    return shallow(<BreadcrumbArray {...props}/>);
  }

  it('should render top level div with className "breadcrumb"',() => {
    const divElement = setup(false).find('div').first();
    expect(divElement.hasClass('breadcrumb')).toBeTruthy();
  });

  it('child contains 3 BreadcrumbItem components if render less then 5 breadcrumbItem',() => {
    const breadcrumbItem = setup(false).find('BreadcrumbItem');
    expect(breadcrumbItem.length).toEqual(3);
  });

  it('child contains 4 BreadcrumbItem components if render more then 5 breadcrumbItem',() => {
    const breadcrumbItem = setup(true).find('BreadcrumbItem');
    expect(breadcrumbItem.length).toEqual(4);
  });

  it('child contains 1 div with className "breadcrumb-item-ignored" if render more then 5 breadcrumbItem',() => {
    expect(setup(true).find('.breadcrumb-item-ignored').length).toEqual(1);
  });
});
