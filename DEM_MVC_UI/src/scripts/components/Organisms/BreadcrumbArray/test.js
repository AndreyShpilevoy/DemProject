/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import breadcrumbs from 'api/__fakeData__/breadcrumbs';
import BreadcrumbArray from './index';

describe('BreadcrumbArray', () => {
  function setup(enumValue) {
    const props = {};
    if (enumValue === 'three'){
      props.breadcrumbArray = [breadcrumbs[2], breadcrumbs[0], breadcrumbs[1]];
    } else if (enumValue === 'four'){
      props.breadcrumbArray = [breadcrumbs[2], breadcrumbs[0], breadcrumbs[4], breadcrumbs[3]];
    } else {
      props.breadcrumbArray = [breadcrumbs[2], breadcrumbs[0], breadcrumbs[4], breadcrumbs[3], breadcrumbs[1], breadcrumbs[5]];
    }

    return shallow(<BreadcrumbArray {...props}/>);
  }

  it('child contains 3 BreadcrumbItem components if render 3 breadcrumbItem',() => {
    const breadcrumbItem = setup('three').find('BreadcrumbItem');
    expect(breadcrumbItem.length).toEqual(3);
  });

  it('child contains 4 BreadcrumbItem components if render 4 breadcrumbItem',() => {
    const breadcrumbItem = setup('four').find('BreadcrumbItem');
    expect(breadcrumbItem.length).toEqual(4);
  });

  it('child contains 5 BreadcrumbItem components if render 5 and more breadcrumbItem',() => {
    const breadcrumbItem = setup('six').find('BreadcrumbItem');
    expect(breadcrumbItem.length).toEqual(5);
  });
});
