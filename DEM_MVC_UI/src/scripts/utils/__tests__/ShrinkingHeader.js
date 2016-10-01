/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {mount} from 'enzyme';
import { ShrinkingHeader } from "../_all";

class Header extends React.Component {
  componentDidMount() {
    ShrinkingHeader.init();
  }
    render() {
    return(
      <div className="container navbar-fixed-top">
        <div className="row">
          <div className="col-xs-12">
            <nav id="header" className="navbar navbar-full header-height header-logo-bg padding-initial">
              <div className="row heigth-inherit">
                <div className="flex col-xs-12 col-lg-4 heigth-inherit"/>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

describe('ShrinkingHeader', () => {
  it('should not throw exception because of Header is not found',() => {
    mount(<Header />);
  });

  it('document.onscrole shouldnt be null or underfined',() => {
    mount(<Header />, { attachTo: document.body });
    expect(document.onscroll).toBeTruthy();
  });
});
