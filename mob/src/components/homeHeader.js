import React from 'react';
import { Header } from 'react-native-elements';
import { Search } from './search';

export function HomeHeader() {
    return (
        <Header
            leftComponent={{ icon: 'menu', color: 'white' }}
            centerComponent={() => <Search />}
            rightComponent={{ icon: 'home', color: 'white' }}
            containerStyle={{
                backgroundColor: 'black',
                justifyContent: 'center',
                height: 100,
                borderBottomColor: 'black'
            }}
        />
    );
}