import { IntroStackNavigator } from '../index';

// Start with two routes: The Main screen, with the Login screen on top.
const intro = IntroStackNavigator.router.getActionForPathAndParams('Intro');
const introNavState = IntroStackNavigator.router.getStateForAction(intro);

const initialNavState = IntroStackNavigator.router.getStateForAction(intro, introNavState);

export default function introNavigate(state = initialNavState, action) {
    const nextState = IntroStackNavigator.router.getStateForAction(action, state);
    return nextState || state;
}
