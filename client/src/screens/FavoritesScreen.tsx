import React from 'react';
import {View} from 'react-native';
import {NavigationScreenComponent} from 'react-navigation';
import {createTabIcon} from '../components';

export const FavoritesScreen: NavigationScreenComponent = () => {
    return (
        <View />
    );
};

FavoritesScreen.navigationOptions = {
    tabBarIcon: createTabIcon('stars'),
};
