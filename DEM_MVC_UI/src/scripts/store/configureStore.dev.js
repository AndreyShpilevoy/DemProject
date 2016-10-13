/* eslint import/no-extraneous-dependencies: "off" */

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import root from 'lodash/_root';
import rootReducer from "../reducers/rootReducer";
//import {logger, crashReporter} from '../middlewares/errorNotificationsMiddleware';
import {crashReporter} from '../middlewares/errorNotificationsMiddleware';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        root.devToolsExtension && root.devToolsExtension(),
        applyMiddleware(
          sagaMiddleware,
          //logger,
          crashReporter,
          reduxImmutableStateInvariant()
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
