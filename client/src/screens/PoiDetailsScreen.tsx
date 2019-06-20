import React from 'react';
import {Text} from 'react-native';
import {NavigationScreenConfigProps, NavigationContainer} from 'react-navigation';
import {Container} from './styles';

export type PoiDetailsScreenProps = {} & NavigationScreenConfigProps;

export const PoiDetailsScreen: React.FC<PoiDetailsScreenProps> = () => {
    return (
        <Container>
            <Text>Poi Details Screen</Text>
        </Container>
    );
};

((PoiDetailsScreen as unknown) as NavigationContainer).navigationOptions = {
    title: 'Point of interest',
};
