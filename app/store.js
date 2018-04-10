import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import { reactNavigationMiddleware } from './utils/react-navigation-redux';
import AppReducer from './combined-reducers';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    AppReducer,
    composeEnhancers(
        applyMiddleware(ReduxThunk, reactNavigationMiddleware)
    )
);
