import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {NavigationStackRouterConfig} from 'react-navigation';
import {theme} from '../../consts';
import {CloseIcon} from './atoms';

const headerBackImage = <>
    <StatusBar barStyle="light-content" />
    <CloseIcon name="close" size={theme.iconSize} color="white" />
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
