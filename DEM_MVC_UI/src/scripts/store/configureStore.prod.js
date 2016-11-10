import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers/rootReducer';
import crashReporter from 'middlewares/crashReporterMiddleware';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(
          crashReporter,
          sagaMiddleware
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
