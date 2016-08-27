/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint import/imports-first: "off" */

jest.unmock("../../../src/scripts/components/topics/TopicsPage.js");

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TopicsPage from "../../../src/scripts/components/topics/TopicsPage.js";
import StatelessWrapper from "../../../testHelpers/StatelessWrapper";

describe('TopicsPage', () => {

  it('tag <p> should contein string "Test TopicsPage"', () => {
    const topicsPage = TestUtils.renderIntoDocument(
      <StatelessWrapper>
        <TopicsPage />
      </StatelessWrapper>
    );

    let message = TestUtils.findRenderedDOMComponentWithTag(topicsPage, 'p');

    expect(message.textContent).toEqual("Test TopicsPage");
  });

});
