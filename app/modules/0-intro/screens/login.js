import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Button, Container, Text } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import EmailLoginForm from './components/login/email-login-form';
import * as userActions from '../actions/auth';

class LoginScreen extends React.Component {

    render() {
        return (
            <Container>
                <EmailLoginForm
                    onSubmit={(values) => this.props.actions.loginWithEmail(values.email, values.password)}
                    buttonText='Login'
                />
                <Spinner visible={this.props.loggingIn} />
                <View style={{ flex: 1 }}>
                    <Button
                        block
                        primary
                        onPress={(value) => {
                            console.log('onPress: ', value);
                            console.log('loginOrRegisterWithFacebook: ', this.props.actions.loginOrRegisterWithFacebook);
                            this.props.actions.loginOrRegisterWithFacebook();
                        }}
                    >
                        <Text> Facebook Login </Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

/*const styles = StyleSheet.create({
    facebook: {

    }
});*/

export default connect(
    state => ({
        loggingIn: state.auth.loggingIn
    }),
    dispatch => ({
        actions: bindActionCreators(userActions, dispatch)
    })
)(LoginScreen);
