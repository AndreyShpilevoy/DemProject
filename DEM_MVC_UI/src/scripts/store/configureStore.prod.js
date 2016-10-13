import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "../reducers/rootReducer";
//import {logger, crashReporter} from '../middlewares/errorNotificationsMiddleware';
import {crashReporter} from '../middlewares/errorNotificationsMiddleware';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(
          //logger,
          crashReporter,
          sagaMiddleware
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
