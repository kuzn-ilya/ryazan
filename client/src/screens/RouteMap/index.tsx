import React from 'react';
import {MapScreen} from '../Map';

export const RouteMapScreen: typeof MapScreen = props =>
    <MapScreen {...props} />;

RouteMapScreen.navigationOptions = {
    tabBarButtonComponent: () => null,
};
