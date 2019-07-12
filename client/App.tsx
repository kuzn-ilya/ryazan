import React, {useState} from 'react';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks';
import {ApolloProvider} from 'react-apollo';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {AppNavigator} from './src/Navigator';
import {env} from './src/consts';
import {messageBox} from './src/services';

const client = new ApolloClient({
    uri: `${env.apiUrl}/graphql`,
    cache: new InMemoryCache(),
});

const App = () => {
    const [isReady, setIsReady] = useState(false);

    const load = async () => {
        await Font.loadAsync({
            Roboto: require('./assets/fonts/roboto/Roboto-Regular.ttf'),
            RobotoMedium: require('./assets/fonts/roboto/Roboto-Medium.ttf'),
            RobotoBold: require('./assets/fonts/roboto/Roboto-Bold.ttf'),
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
                <AppNavigator />
            </ApolloHooksProvider>
        </ApolloProvider>
    );
};

export default App;
