import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/login';
import { HomeScreen } from './screens/home';
import { Index } from './screens/index';

const AppStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    }
});
const AuthStack = createStackNavigator({ 
    SignIn: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    } 
});

export const AppStackNavigator = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: Index,
            App: AppStack,
            Auth: AuthStack,
        }, {
            initialRouteName: 'AuthLoading',
        }
    )
);