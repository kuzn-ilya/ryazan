import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationStackRouterConfig} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';
import {theme} from '../../consts';

const headerBackImage = <>
    <StatusBar barStyle="light-content" />
    <MaterialIcons name="close" size={theme.iconSize} color="white" />
</>

export const windowHeaderConfig: NavigationStackRouterConfig['defaultNavigationOptions'] = {
    headerStyle: {
        height: theme.headerHeight,
        backgroundColor: theme.windowHeaderColor,
    },
    headerTintColor: 'white',
    headerBackImage,
    headerBackTitle: null,
    headerTitleStyle: {
        textTransform: 'uppercase',
    },
};
