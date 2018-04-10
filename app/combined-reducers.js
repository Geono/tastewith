import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import introNavigate from './modules/0-intro/redux-navigator/index';
import auth from './modules/0-intro/actions/auth';

const AppReducer = combineReducers({
    form,
    auth,
    introNavigate,
});

export default AppReducer;
