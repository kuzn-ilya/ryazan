import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks';
import {ApolloProvider} from 'react-apollo';
import {AppLoading, Linking} from 'expo';
import * as Font from 'expo-font';
import {AppNavigator} from './src/Navigator';
import {env} from './src/consts';
import {messageBox} from './src/services';
import {FavoritesProvider, FilterProvider} from './src/providers';

const client = new ApolloClient({
    uri: `${env.apiUrl}/graphql`,
    cache: new InMemoryCache(),
});

const App = () => {
    const [isReady, setIsReady] = useState(false);
    const uriPrefix = Linking.makeUrl('/');

    const load = async () => {
        await Font.loadAsync({
            'PT Sans': require('./assets/fonts/pt-sans/PTSans-Regular.ttf'),
            'PT Sans Bold': require('./assets/fonts/pt-sans/PTSans-Bold.ttf'),
            'IcoMoon': require('./assets/fonts/icomoon.ttf'),
        });
    };

    if (!isReady) {
        return <AppLoading
            startAsync={load}
            onFinish={() => setIsReady(true)}
            onError={messageBox.error}
        />;
    }

    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <FavoritesProvider>
                    <FilterProvider>
                        <StatusBar barStyle="dark-content" />
                        <AppNavigator uriPrefix={uriPrefix} />
                    </FilterProvider>
                </FavoritesProvider>
            </ApolloHooksProvider>
        </ApolloProvider>
    );
};

export default App;
