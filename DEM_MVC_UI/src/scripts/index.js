import React from 'react';
import {render} from 'react-dom';
import root from 'lodash/_root';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from 'store/configureStore';
import routes from 'routes';
import rootSaga from 'sagas/rootSaga';
import 'scss/main-dem.scss';

const store = configureStore()();
store.runSaga(rootSaga);
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
      <Router history={history} routes={routes}/>
    </Provider>,
  root.document.getElementById('app')
);
