import React from 'react';
import {View} from 'react-native';
import {NavigationScreenComponent} from 'react-navigation';
import {createTabIcon} from '../components';

export const RoutesScreen: NavigationScreenComponent = () => {
    return (
        <View />
    );
};

RoutesScreen.navigationOptions = {
    tabBarIcon: createTabIcon('directions-walk'),
};
