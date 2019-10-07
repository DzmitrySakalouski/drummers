/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { AppStackNavigator } from './src/index';
import { client } from './src/constants/request';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppStackNavigator />
    </ApolloProvider>
  );
};

export default App;
