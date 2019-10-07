import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getToken } from '../services/token';

export const Index = (props) => {
    console.log(props);
    useEffect(() => {
        getToken().then(token => {
            token ? props.navigation.navigate('App') : props.navigation.navigate('Auth');
        });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator/>
        </View>
    );
}