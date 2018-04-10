import { createAction, handleActions } from 'redux-actions';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

// 1. Actions

const EMAIL_REGISTER = 'EMAIL_REGISTER';
const LOGIN_WITH_EMAIL = 'LOGIN_WITH_EMAIL';
const LOGIN_WITH_FACEBOOK = 'LOGIN_WITH_FACEBOOK';
const LOGGING_IN = 'LOGGING_IN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGOUT = 'LOGOUT';

// 2. Action creators

export const registerByEmail = createAction(EMAIL_REGISTER);
export const loggingIn = createAction(LOGGING_IN);
export const loginFailed = createAction(LOGIN_FAILED);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const logout = createAction(LOGOUT, () => firebase.auth().signOut());
export const loginWithEmail = (email, password) => (dispatch) => {
    dispatch(loggingIn('email'));
    return firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(loginSuccess(user));
        })
        .catch((error) => {
            dispatch(loginFailed(error));
        });
};

export const loginOrRegisterWithFacebook = () => (dispatch) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then((result) => {
            console.log('loginWithReadPermissions complete');
            if (result.isCancelled) {
                return Promise.reject(new Error('The user cancelled the request'));
            }
            // Retrieve the access token
            return AccessToken.getCurrentAccessToken();
        })
        .then((data) => {
            console.log('token data: ', data);
            // Create a new Firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            // Login with the credential
            console.log('credential: ', credential);
            return firebase.auth().signInWithCredential(credential);
        })
        .then((user) => {
            // If you need to do anything with the user, do it here
            console.log('signInWithCredential complete');
            // The user will be logged in automatically by the
            // `onAuthStateChanged` listener we set up in App.js earlier
            dispatch(loginSuccess(user));
        })
        .catch((error) => {
            dispatch(loginFailed(error));
        });
};

// 3. Initial States

const initialState = {};

// 4. Reducers

export default handleActions({
    [ EMAIL_REGISTER ]: (state, action) => ({
        ...state,
        user: action.payload
    }),
    [ LOGGING_IN ]: (state, action) => ({
        ...state,
        loggingIn: true,
        method: action.payload
    }),
    [ LOGIN_SUCCESS ]: (state, action) => ({
        ...state,
        user: action.payload,
        loggingIn: false
    }),
    [ LOGIN_FAILED ]: (state, action) => ({
        ...state,
        error: action.payload,
        loggingIn: false
    }),
    [ LOGOUT ]: (state) => ({
        ...state,
        user: null,
        loggingIn: false
    })
}, initialState);

// 5. Selectors

export const getEmailUser = state => state.user;