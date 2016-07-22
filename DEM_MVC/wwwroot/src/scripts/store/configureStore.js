import {createStore, applyMiddleware} from "redux";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';//todo: only for development
import rootReducer from "../reducers/rootReducer";

export default function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStateInvariant())//todo: only for development
  );
}
