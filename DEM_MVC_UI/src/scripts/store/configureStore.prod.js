import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "../reducers/rootReducer";

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(
          sagaMiddleware
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
