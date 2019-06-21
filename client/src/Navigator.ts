import {
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import {
    AboutScreen,
    FavoritesScreen,
    MapScreen,
    PoiDetailsScreen,
    PoiScreen,
    RoutesScreen,
} from './screens';

import {Routes} from './consts';

const Tabs = createBottomTabNavigator({
    [Routes.MAP]: MapScreen,
    [Routes.POI]: PoiScreen,
    [Routes.ROUTES]: RoutesScreen,
    [Routes.FAVORITES]: FavoritesScreen,
}, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#eb5757',
        inactiveTintColor: '#666',
        style: {
            height: 60,
        },
    },
    navigationOptions: {
        header: null,
    },
});

const Stack = createStackNavigator({
    [Routes.TABS]: Tabs,
    [Routes.POI_DETAILS]: PoiDetailsScreen,
}, {
    navigationOptions: {
        drawerLabel: () => null,
    },
})

const Drawer = createDrawerNavigator({
    [Routes.STACK]: Stack,
    [Routes.ABOUT]: AboutScreen,
});

export const AppNavigator = createAppContainer(Drawer);
