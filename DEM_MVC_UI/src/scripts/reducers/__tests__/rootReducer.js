/*eslint no-undef: "off"*/

import * as rootReducer from "../rootReducer";

function mockFuncs() {
  return {
    combineReducers: jest.fn((reducers) => (reducers))
  };
}
jest.mock('redux', () => mockFuncs());

describe('rootReducer', () => {
  it('should return 9 reducers from default', () => {
    expect(Object.keys(rootReducer.default).length).toEqual(9);
  });
});
