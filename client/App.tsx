import React from 'react';
import Constants from 'expo-constants';
import ApolloClient, {InMemoryCache, gql} from 'apollo-boost';
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks';
import {ApolloProvider} from 'react-apollo';
import {AppNavigator} from './src/Navigator';

const client = new ApolloClient({
    uri: Constants.manifest.extra.apiUrl,
    cache: new InMemoryCache(),
});

const App = () => (
    <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
            <AppNavigator />
        </ApolloHooksProvider>
    </ApolloProvider>
);

export default App;
