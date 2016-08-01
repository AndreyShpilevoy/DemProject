import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; //todo: only for development
import rootReducer from "../reducers/rootReducer";

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        window.devToolsExtension && window.devToolsExtension(), //todo: only for development
        applyMiddleware(
          sagaMiddleware,
          reduxImmutableStateInvariant() //todo: only for development
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
