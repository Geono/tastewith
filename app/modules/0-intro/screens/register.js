import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { bindActionCreators } from 'redux';

import EmailLoginForm from './components/login/email-login-form';
import * as userActions from '../actions/auth';

class RegisterScreen extends React.Component {

    onRegister = (values) => {
        const { UserActions } = this.props;
        console.log('onRegister');

        firebase.auth()
            .createUserAndRetrieveDataWithEmailAndPassword(values.email, values.password)
            .then(user => {
                Alert.alert('Register complete! Hello, ', values.email, values.password);
                UserActions.registerByEmail(user);
            })
            .catch(error => {
                const { code, message } = error;
                Alert.alert(`[Register Failed][${code}]: ${message}`);
            });
    };

    constructor() {
        super();
        this.unsubscriber = null;
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }

    render() {
        return <EmailLoginForm onSubmit={values => this.onRegister(values)} buttonText='Register' />;
    }
}

export default connect(
    state => ({
        loggingIn: state.auth.loggingIn
    }),
    dispatch => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(RegisterScreen);
