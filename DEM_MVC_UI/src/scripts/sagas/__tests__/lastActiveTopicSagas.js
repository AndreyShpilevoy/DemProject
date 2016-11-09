/*eslint no-undef: "off"*/

import * as lastActiveTopicSagas from "sagas/lastActiveTopicSagas";
import LastActiveTopicApi from "api/__mocks__/LastActiveTopicApi";
import CheckObject from "testHelpers/CheckObject";

describe('lastActiveTopicSagas', () => {
  it('getLastActiveTopics first yeald should return TAKE pattern "GET_LAST_ACTIVE_TOPICS"', () => {
    const generator = lastActiveTopicSagas.getLastActiveTopics();

    expect(generator.next().value.TAKE.pattern).toEqual('GET_LAST_ACTIVE_TOPICS');
  });

  it('getLastActiveTopics second yeald should return CALL to function "LastActiveTopicApi.getLastActiveTopics"', () => {
    const generator = lastActiveTopicSagas.getLastActiveTopics();

    generator.next();
    expect(generator.next().value.CALL.fn).toEqual(LastActiveTopicApi.getLastActiveTopics);
  });

  it('getLastActiveTopics third yeald should return PUT action.type "GET_LAST_ACTIVE_TOPICS_SUCCESS"', () => {
    const generator = lastActiveTopicSagas.getLastActiveTopics();
    const lastActiveTopics = LastActiveTopicApi.getLastActiveTopics();

    generator.next();
    generator.next();
    expect(generator.next(lastActiveTopics).value.PUT.action.type).toEqual('GET_LAST_ACTIVE_TOPICS_SUCCESS');
  });

  it('getLastActiveTopics third yeald should return PUT action.lastActiveTopics that is a Promise', () => {
    const generator = lastActiveTopicSagas.getLastActiveTopics();
    const lastActiveTopics = LastActiveTopicApi.getLastActiveTopics();

    generator.next();
    generator.next();
    expect(CheckObject.IsPromise(generator.next(lastActiveTopics).value.PUT.action.lastActiveTopics)).toBeTruthy();
  });
});
