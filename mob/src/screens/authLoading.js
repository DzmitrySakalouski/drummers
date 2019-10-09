import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getUserToken } from '../services/token';
import AsyncStorage from '@react-native-community/async-storage';

export const Index = (props) => {
    // AsyncStorage.removeItem('token')
    // AsyncStorage.removeItem('userId')
    useEffect(() => {
        getUserToken().then(userData => {
            userData.token && userData.id ? props.navigation.navigate('App', { userData }) : props.navigation.navigate('Auth');
        });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator/>
        </View>
    );
}