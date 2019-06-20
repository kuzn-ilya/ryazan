import React from 'react';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks';
import {ApolloProvider} from 'react-apollo';
import {AppNavigator} from './src/Navigator';
import {env} from './src/consts'

const client = new ApolloClient({
    uri: env.apiUrl,
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
