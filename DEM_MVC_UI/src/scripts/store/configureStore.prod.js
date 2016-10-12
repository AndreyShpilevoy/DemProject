import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "../reducers/rootReducer";
import {errorHandler} from "../utils/_all";
import reduxCatch from '../middlewares/errorNotificationsMiddleware';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(
        reduxCatch(errorHandler),
          sagaMiddleware
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
