/*eslint no-undef: "off"*/

import * as rootSaga from "sagas/rootSaga";

describe('rootSaga', () => {
  it('should return 10 Sagas from default generator', () => {
    expect(rootSaga.default().next().value.length).toEqual(10);
  });
});
