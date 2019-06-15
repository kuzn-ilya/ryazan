import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import {NavigationScreenConfigProps, NavigationContainer} from 'react-navigation';
import {Routes} from './consts';
import {Container} from './styles';

export type PoiScreenProps = {} & NavigationScreenConfigProps;

export const PoiScreen: React.FC<PoiScreenProps> = ({navigation}) => {
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

((PoiScreen as unknown) as NavigationContainer).navigationOptions = {
    title: 'Points of Interest',
};
