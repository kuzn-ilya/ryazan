import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationStackOptions} from 'react-navigation-stack';
import {theme} from '../../consts';
import {CloseIcon} from './atoms';

const headerBackImage = () =>
    <>
        <StatusBar barStyle="light-content" />
        <CloseIcon name="close" size={theme.iconSize} color="white" />
    </>

export const windowHeaderConfig: NavigationStackOptions = {
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
