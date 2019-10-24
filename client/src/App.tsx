import React, {useState, useRef} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainerComponent} from 'react-navigation';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks';
import {AppLoading, Linking, registerRootComponent} from 'expo';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import {AppNavigator} from './Navigator';
import {env} from './consts';
import {messageBox} from './services';
import {FavoritesProvider, FilterProvider} from './providers';
import {useNearPoiNotifications} from './hooks';

const client = new ApolloClient({
    uri: `${env.apiUrl}/graphql`,
    cache: new InMemoryCache(),
});

const App2 = () => {
    const navigator = useRef<NavigationContainerComponent>(null);
    const uriPrefix = Linking.makeUrl('/');
    useNearPoiNotifications(navigator);
    return <AppNavigator ref={navigator} uriPrefix={uriPrefix} />;
};

const App = () => {
    const [isReady, setIsReady] = useState(false);

    const load = async () => {
        await Font.loadAsync({
            'PT Sans': require('../assets/fonts/pt-sans/PTSans-Regular.ttf'),
            'PT Sans Bold': require('../assets/fonts/pt-sans/PTSans-Bold.ttf'),
            'IcoMoon': require('../assets/fonts/icomoon.ttf'),
        });

        await Permissions.askAsync(
            Permissions.LOCATION,
            Permissions.NOTIFICATIONS,
        );
    };

    if (!isReady) {
        return <AppLoading
            startAsync={load}
            onFinish={() => setIsReady(true)}
            onError={messageBox.error}
        />;
    }

    return (
        <ApolloHooksProvider client={client}>
            <FavoritesProvider>
                <FilterProvider>
                    <StatusBar barStyle="dark-content" />
                    <App2 />
                </FilterProvider>
            </FavoritesProvider>
        </ApolloHooksProvider>
    );
};

export default registerRootComponent(App);
