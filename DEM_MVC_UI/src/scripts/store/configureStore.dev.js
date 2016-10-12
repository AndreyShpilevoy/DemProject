/* eslint import/no-extraneous-dependencies: "off" */

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import root from 'lodash/_root';
import rootReducer from "../reducers/rootReducer";
import {errorHandler} from "../utils/_all";
import reduxCatch from '../middlewares/errorNotificationsMiddleware';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        root.devToolsExtension && root.devToolsExtension(),
        applyMiddleware(
          sagaMiddleware,
          reduxCatch(errorHandler),
          reduxImmutableStateInvariant()
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
