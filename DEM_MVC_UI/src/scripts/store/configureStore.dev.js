/* eslint import/no-extraneous-dependencies: "off" */

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//import reduxCatch from 'redux-catch';
import root from 'lodash/_root';
import rootReducer from "../reducers/rootReducer";

// function errorHandler(error, getState) {
//   console.error(error);
//   console.debug('current state', getState());
// }

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        root.devToolsExtension && root.devToolsExtension(),
        applyMiddleware(
          sagaMiddleware,
          //reduxCatch(errorHandler),
          reduxImmutableStateInvariant()
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
