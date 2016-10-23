/*eslint no-undef: "off"*/

import * as rootReducer from "reducers/rootReducer";

function mockFuncs() {
  return {
    combineReducers: jest.fn((reducers) => (reducers))
  };
}
jest.mock('redux', () => mockFuncs());

describe('rootReducer', () => {
  it('should return 11 reducers from default', () => {
    expect(Object.keys(rootReducer.default).length).toEqual(11);
  });
});
