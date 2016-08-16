import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from "../reducers/rootReducer";

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        window.devToolsExtension && window.devToolsExtension(),
        applyMiddleware(
          sagaMiddleware,
          reduxImmutableStateInvariant()
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
