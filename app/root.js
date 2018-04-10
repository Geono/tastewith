import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
import * as userActions from './modules/0-intro/actions/auth';
import IntroScreenRouter from './modules/0-intro/index';
import HomeScreenRouter from './modules/1-home/index';

class Root extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log('auth state chagned: ', user);
            if(user)
                this.props.UserActions.loginSuccess(user);
        });
    }

    render() {
        const { auth } = this.props;
        return auth.user ? <HomeScreenRouter /> : <IntroScreenRouter />;
    }
}

Root.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.object,
        loggingIn: PropTypes.bool
    })
};

Root.defaultProps = {
    auth: {
        user: null,
        loggingIn: false
    }
};

export default connect(
    state => ({
        auth: state.auth
    }),
    dispatch => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Root);
