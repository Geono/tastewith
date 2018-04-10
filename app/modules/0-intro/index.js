import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import { addListener } from '../../utils/react-navigation-redux';
import IntroScreen from './screens/intro';
import LoginScreen from './screens/login';
import RegisterScreen from "./screens/register";

export const IntroStackNavigator = StackNavigator({
    Intro: {
        screen: IntroScreen,
        navigationOptions: {
            title: 'Sample Intro Page',
            headerLeft: null
        },
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Login',
        },
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            title: 'Register',
        },
    }
});

class IntroNavigationState extends React.Component {

    render() {
        const { dispatch, introNavigate } = this.props;
        return (
            <IntroStackNavigator
                navigation={addNavigationHelpers({
                    dispatch,
                    state: introNavigate,
                    addListener,
                })}
            />
        );
    }
}

IntroNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    introNavigate: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = state => ({
    introNavigate: state.introNavigate,
});

export default connect(mapStateToProps)(IntroNavigationState);
