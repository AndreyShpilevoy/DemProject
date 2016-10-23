/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import BreadcrumbItem from "components/BreadcrumbItem";
import breadcrumbs from "api/__fakeData__/breadcrumbs";

describe('BreadcrumbItem', () => {
  function setup(currentPage) {
    const props = {
      breadcrumbItem: breadcrumbs[0],
      setActive: currentPage
    };
    return shallow(<BreadcrumbItem {...props}/>);
  }

  it('should render top level li with className "breadcrumb-item"',() => {
    const divElement = setup(false).find('div').first();
    expect(divElement.hasClass("breadcrumb-item")).toBeTruthy();
  });

  it('should render top level li with className "breadcrumb-item-active"',() => {
    const divElement = setup(true).find('div').first();
    expect(divElement.hasClass("breadcrumb-item-active")).toBeTruthy();
  });

  it('Link component has prop "to" equel to "/Conference"',() => {
    const linkComponent = setup(false).find('Link');
    expect(linkComponent.prop("to")).toBe("/Conference");
  });

});
