import React from 'react';
import {View} from 'react-native';
import {NavigationScreenConfigProps, NavigationContainer} from 'react-navigation';

export type FavoritesScreenProps = {} & NavigationScreenConfigProps;

export const FavoritesScreen: React.FC<FavoritesScreenProps> = () => {
    return (
        <View />
    );
};

((FavoritesScreen as unknown) as NavigationContainer).navigationOptions = {
    title: 'Favorites',
};
