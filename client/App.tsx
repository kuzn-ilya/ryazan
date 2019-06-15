import React from 'react';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks';
import {ApolloProvider} from 'react-apollo';
import {AppNavigator} from './src/Navigator';

const URI = 'http://192.168.0.200:1337'; // TODO: get through env var

const client = new ApolloClient({
    uri: `${URI}/graphql`,
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
