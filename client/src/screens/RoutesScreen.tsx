import React from 'react';
import {View} from 'react-native';
import {NavigationScreenConfigProps, NavigationContainer} from 'react-navigation';

export type RoutesScreenProps = {} & NavigationScreenConfigProps;

export const RoutesScreen: React.FC<RoutesScreenProps> = () => {
    return (
        <View />
    );
};

((RoutesScreen as unknown) as NavigationContainer).navigationOptions = {
    title: 'Routes',
};
