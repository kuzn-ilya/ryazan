import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import {NavigationScreenComponent} from 'react-navigation';
import {createTabIcon} from '../components';
import {Routes} from '../consts/routes';
import {Container} from './styles';

export const PoiScreen: NavigationScreenComponent = ({navigation}) => {
    const handlePress = () => {
        navigation.navigate(Routes.POI_DETAILS);
    };

    return (
        <Container>
            <TouchableHighlight onPress={handlePress}>
                <Text>Show Poi Details</Text>
            </TouchableHighlight>
        </Container>
    );
};

PoiScreen.navigationOptions = {
    tabBarIcon: createTabIcon('format-list-bulleted'),
};
