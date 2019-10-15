import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/login';
import { HomeScreen } from './screens/home';
import { Index } from './screens/authLoading';
import { HomeHeader } from './components/homeHeader';
import { AddPostScreen } from './screens/addPostScreen';
import { PostScreen } from './screens/post';

const AppStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: HomeHeader
        }
    },
    AddPostForm: {
        screen: AddPostScreen,
        navigationOptions: {
            title: 'Создать пост',
        }
    },
    Post: {
        screen: PostScreen
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

