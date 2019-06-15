import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationScreenConfigProps} from 'react-navigation';
import {MAP} from './consts';
import {Container} from './styles';

export type HomeScreenProps = {} & NavigationScreenConfigProps;

export class HomeScreen extends React.Component<HomeScreenProps> {
    static navigationOptions = {
        title: 'Home',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Text>Ryazan Mobile Application</Text>
                <Button title="Open map screen" onPress={() => navigate(MAP)} />
            </Container>
        );
    }
}
