/*eslint no-undef: "off"*/

import * as lastActiveTopicSagas from "../lastActiveTopicSagas";
import LastActiveTopicApi from "../../api/__mocks__/LastActiveTopicApi";
import CheckObject from "../../../../testHelpers/CheckObject";

describe('lastActiveTopicSagas', () => {
  it('getLastActiveTopicsGenerator first yeald should return TAKE pattern "GET_LAST_ACTIVE_TOPICS"', () => {
    const getNavigationLinksGenerator = lastActiveTopicSagas.getLastActiveTopics();

    expect(getNavigationLinksGenerator.next().value.TAKE.pattern)
      .toEqual('GET_LAST_ACTIVE_TOPICS');
  });

  it('getLastActiveTopicsGenerator second yeald should return CALL to function "LastActiveTopicApi.getLastActiveTopics"', () => {
    const getNavigationLinksGenerator = lastActiveTopicSagas.getLastActiveTopics();

    getNavigationLinksGenerator.next();

    expect(getNavigationLinksGenerator.next().value.CALL.fn)
      .toEqual(LastActiveTopicApi.getLastActiveTopics);
  });

  it('getLastActiveTopicsGenerator third yeald should return PUT action.type "GET_LAST_ACTIVE_TOPICS_SUCCESS"', () => {
    const getNavigationLinksGenerator = lastActiveTopicSagas.getLastActiveTopics();
    const lastActiveTopics = LastActiveTopicApi.getLastActiveTopics();

    getNavigationLinksGenerator.next();
    getNavigationLinksGenerator.next();

    expect(getNavigationLinksGenerator.next(lastActiveTopics).value.PUT.action.type)
      .toEqual('GET_LAST_ACTIVE_TOPICS_SUCCESS');
  });

  it('getLastActiveTopicsGenerator third yeald should return PUT action.lastActiveTopics that is a Promise', () => {
    const getNavigationLinksGenerator = lastActiveTopicSagas.getLastActiveTopics();
    const lastActiveTopics = LastActiveTopicApi.getLastActiveTopics();

    getNavigationLinksGenerator.next();
    getNavigationLinksGenerator.next();

    expect(CheckObject.IsPromise(getNavigationLinksGenerator.next(lastActiveTopics).value.PUT.action.lastActiveTopics))
      .toBeTruthy();
  });
});
