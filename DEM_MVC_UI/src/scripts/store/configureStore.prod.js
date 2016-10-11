import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
//import reduxCatch from 'redux-catch';
import rootReducer from "../reducers/rootReducer";

// function errorHandler(error, getState) {
//   console.error(error);
//   console.debug('current state', getState());
// }

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(
        //reduxCatch(errorHandler),
          sagaMiddleware
        )
    );
    store.runSaga = sagaMiddleware.run;
    return store;
}
